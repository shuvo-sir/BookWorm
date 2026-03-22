import jwt from "jsonwebtoken"; // Fix 1: Default import
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Fix 2 & 3: Get header safely
        const authHeader = req.header("Authorization");
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        const token = authHeader.replace("Bearer ", "");

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user (Make sure your JWT payload uses 'id' or '_id')
        const user = await User.findById(decoded.id || decoded._id).select("-password");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute:", error.message);
        res.status(401).json({ message: "Token is not valid" });
    }
};

export default protectRoute;