import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { IAuthUser } from "../types/models.js";

export interface TokenPayload {
    id: string;
    email: string;
    role: string;
}

export const generateToken = (user: IAuthUser) => {
    return jwt.sign({ 
        id: user._id,
        email: user.email,
        role: user.role,
     }, env.JWT_SECRET, { expiresIn: "1d" });
}