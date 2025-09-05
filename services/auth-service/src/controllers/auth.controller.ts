import { Request, Response } from "express";
import { AuthUser } from "../models/auth.model.js";
import { comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { IAuthUser } from "../types/models.js";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role, institution } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const existingUser = await AuthUser.findOne({ email });
        if(existingUser) return res.status(409).json({ message: "User already exists" });

        const user: IAuthUser = new AuthUser({
            name,
            email,
            password,
            role,
            institution,
        });

        await user.save();
        const token: string = generateToken(user);

        return res.status(201).json({ 
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });

    } catch (err) {
        console.error("Error Registering User: ", err);
        return res.status(500).json({ message: "Failed to register" });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const user: IAuthUser = await AuthUser.findOne({ email }).select("+password");
        if(!user) return res.status(401).json({ message: "Invalid Credentials" });

        const isMatch: boolean = await comparePassword(password, user.password);
        if(!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

        const token: string = generateToken(user);

        return res.status(200).json({ 
            message: "Logged in successfully", 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },  
            token,
        });

    } catch (err) {
        console.error("Error Logging In User: ", err);
        return res.status(500).json({ message: "Failed to login" });
    }
}