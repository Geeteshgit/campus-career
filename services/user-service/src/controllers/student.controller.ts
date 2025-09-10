import { Response } from "express"
import { User } from "../models/user.model.js";

export const getStudents = async (req: any, res: Response) => {
    try {
        let institution;
        if(req.user.role === "institution_admin") {
            institution = req.user.institution;
        } else if(req.user.role === "super_admin") {
            institution = req.query.institution;
        }
        const students = await User.find({ role: "student", institution });
        return res.status(200).json({ message: "Students fetched successfully", students });
    } catch (err) {
        console.error("Error Fetching Students: ", err);
        return res.status(500).json({ message: "Failed to fetch students" });
    }
}