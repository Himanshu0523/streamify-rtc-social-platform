import { StreamChat } from "stream-chat"
import "dotenv/config"



const apikey = process.env.STREAM_API_KEY || process.env.STEAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET || process.env.STEAM_API_SECRET;

if (!apikey || !apiSecret) {
//   console.error("Stream API Key or Secret is missing. Check STREAM_API_KEY/STREAM_API_SECRET in your backend environment.");
}

const streamClient = apikey && apiSecret ? StreamChat.getInstance(apikey, apiSecret) : null;

export const upsertStreamUser = async (userData) => {
    try {
        if (!streamClient) throw new Error("Stream client is not configured");
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        // console.error("Error upserting Stream user:", error);
    }
}

export const generateStreamToken = (userId) => {
    try {
        if (!streamClient) throw new Error("Stream client is not configured");
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        // console.error("Error generating Stream token:", error);
    }
};