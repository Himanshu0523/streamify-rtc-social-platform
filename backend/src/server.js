import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import { connectDB } from "./lib/db.js";

const PORT = process.env.PORT ? Number(process.env.PORT.trim()) : 5001;

const app = express();
const server = http.createServer(app); // 🔥 important

// SOCKET SERVER
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send_friend_request", ({ receiverId, request }) => {
    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new_friend_request", request);
    }
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

// MIDDLEWARE
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// START
const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`);
  });
};

startServer();