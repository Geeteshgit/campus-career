import { Request, Response } from "express";
import { User } from "../models/user.model.js";

export const createNewProfile = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const userProfile = new User({
            userId,
        });
        await userProfile.save();
        return res.status(201).json({ message: "User Profile created", userProfile });

    } catch (err) {
        console.error("Error Creating User Profile: ", err);
        return res.status(500).json({ message: "Failed to create profile" });
    }
}