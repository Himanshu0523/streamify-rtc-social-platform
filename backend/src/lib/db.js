// src/lib/db.js
import dns from 'dns';
import mongoose from 'mongoose';

const PUBLIC_DNS_SERVERS = ["1.1.1.1", "8.8.8.8"];

export const connectDB = async () => {
  const dbUri = process.env.MONGODB_URI;

  if (!dbUri || !String(dbUri).trim()) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  dns.setServers(PUBLIC_DNS_SERVERS);
//   console.log("Using DNS servers:", dns.getServers());

  try {
    const conn = await mongoose.connect(String(dbUri).trim());
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // console.error(`MongoDB connection error: ${error.message}`);

    // if (error.message.includes("querySrv") || error.message.includes("ECONNREFUSED")) {
    //   console.error(
    //     "Atlas SRV lookup failed. Check your network/DNS/firewall and verify the MongoDB URI is correct."
    //   );
    // }

    throw error;
  }
};