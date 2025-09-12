import { Request, Response } from  "express";
import { User } from "../models/user.model.js";

export const getSuperAdmin = async (req: Request, res: Response) => {
    try {
        const superAdmins = await User.find({ role: "super_admin" });
        return res.status(200).json({ message: "Super Admins fetched successfully", superAdmins });
    } catch (err) {
        console.error("Error Fetching Super Admins: ", err);
        return res.status(500).json({ message: "Failed to fetch super admins" });
    }
}

export const deleteSuperAdmin = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Super admin deleted successfully", deletedUser });
    } catch (err) {
        console.error("Error Deleting Super Admin: ", err);
        return res.status(500).json({ message: "Failed to delete super admin" });
    }
}