import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { TokenPayload } from "../utils/jwt.js";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token) return res.status(401).json({ message: "Unauthorized: Token missing" });

        const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Error validating token: ", err);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

export const restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        if(!roles.includes(req.user.role)) {
            return res.status(401).json({ message: "Access Denied: You do not have permission" });
        }
        next();
    }
}