import { Response, NextFunction } from "express";

export const restrictTo = (...roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if(!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        if(!roles.includes(req.user.role)) {
            return res.status(401).json({ message: "Access Denied: You do not have permission" });
        }
        next();
    }
}