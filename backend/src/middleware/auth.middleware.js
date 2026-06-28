import jwt from "jsonwebtoken";
import User from "../model/User.js";



export const protectRoute = async (req , res , next) => {
    try {
        const token = req.cookies?.jwt || req.cookie?.jwt;

        if(!token) {
            return res.status(401).json({ message: "Unauthorzied - No token provided"});
        } 
        
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token "});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(401).json({
                message: " Unauthorized - Invalid token"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        // console.log("Error in proctectRoute middleware" , error);
        res.status(500).json({message: "Internal Server Error"});
    }
}