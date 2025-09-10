import { Request, Response } from  "express";
import { User } from "../models/user.model.js";

export const getSuperAdmin = async (req: Request, res: Response) => {
    try {
        const superAdmins = await User.find({ role: "super_admin" });
        return res.status(200).json({ message: "Students fetched successfully", superAdmins });
    } catch (err) {
        console.error("Error Fetching Super Admins: ", err);
        return res.status(500).json({ message: "Failed to fetch super admins" });
    }
}