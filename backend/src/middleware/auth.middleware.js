import { jwt } from "jsonwebtoken";
import User from "../models/User";

const protectRoute = async (req, res, next) => {
    try {
        // get token from header
        const token = req.headers("Authorization").replace("Bearer ", "");
        if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // find user
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error, "Error in protectRoute");
        res.status(500).json({ message: "Error in protectRoute" });
    }
}

export default protectRoute;