import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
// import { generateStreamToken } from "../lib/stream";
import { getStreamToken } from "../controllers/chat.controller.js";


const router = express.Router();

router.get("/token", protectRoute , getStreamToken)

export default router;