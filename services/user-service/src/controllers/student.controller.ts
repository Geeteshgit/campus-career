import { Request, Response } from "express"
import { User } from "../models/user.model.js";

export const getStudents = async (req: any, res: Response) => {
    try {
        const students = await User.find({ role: "student" });
        return res.status(200).json({ message: "Students fetched successfully", students });
    } catch (err) {
        console.error("Error Fetching Students: ", err);
        return res.status(500).json({ message: "Failed to fetch students" });
    }
}

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const deleteStudent = await User.findByIdAndDelete(userId);
        if(!deleteStudent) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Student deleted successfully", deleteStudent });
    } catch (err) {
        console.error("Error Deleting Student: ", err);
        return res.status(500).json({ message: "Failed to delete student" });
    }
}