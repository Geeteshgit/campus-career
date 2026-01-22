import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const checkAuth = async (req, res, next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token) return res.status(401).json({ message: "Unauthorized: Token missing" });

        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Error validating token: ", err);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}