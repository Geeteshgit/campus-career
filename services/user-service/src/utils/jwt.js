import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateToken = (user) => {
    return jwt.sign({ 
        id: user._id,
        email: user.email,
        role: user.role,
     }, env.JWT_SECRET, { expiresIn: "1d" });
}