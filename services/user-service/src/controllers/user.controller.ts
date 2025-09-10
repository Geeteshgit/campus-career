import { Request, Response } from "express";
import { User } from "../models/user.model.js";

export const createNewUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const userProfile = new User({
            userId,
        });
        await userProfile.save();
        return res.status(201).json({ message: "User profile created successfully", userProfile });

    } catch (err) {
        console.error("Error Creating User Profile: ", err);
        return res.status(500).json({ message: "Failed to create profile" });
    }
}

export const getMe = async(req: any, res: Response) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        return res.status(200).json({ message: "Fetched user", user });
    
    } catch (err) {
        console.error("Error Fetching User Data: ", err);
        return res.status(500).json({ message: "Failed to fetch data" });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ userId });

        if(!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        return res.status(200).json({ message: "Fetched user", user });

    } catch (err) {
        console.error("Error Fetching User Profile: ", err);
        return res.status(500).json({ message: "Failed to fetch user" });
    }
}