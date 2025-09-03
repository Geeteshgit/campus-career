import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { IUser } from "../types/models.js";

export const generateToken = (user: IUser) => {
    return jwt.sign({ 
        id: user._id,
        email: user.email,
        role: user.role,
     }, env.JWT_SECRET, { expiresIn: "1d" });
}