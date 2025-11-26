import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { IUser } from "../models/user.model.js";
import { publishMessage } from "../utils/rabbitmq.js";
import { Student } from "../models/student.model.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, phone } = req.body;
    if (!name || !email || !password || !phone || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const user: IUser = new User({
      name,
      email,
      password,
      role,
      phone,
    });

    if (role === "student") {
      await Student.create({
        userId: user._id,
        enrollmentNumber: "",
        program: "",
        year: 1,
        skills: [],
        appliedJobs: [],
      });
    }

    await user.save();
    const token: string = generateToken(user);

    await publishMessage("userQueue", {
      type: "create_profile",
      payload: {
        userId: user._id,
      },
    });

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
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user: IUser = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    const isMatch: boolean = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials" });

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
};

export const changePassword = async (req: any, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await comparePassword(oldPassword, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect current password" });

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Error Updating User Profile: ", err);
    res.status(400).json({ message: "Failed to change password" });
  }
};

export const getMe = async (req: Request, res: Response) => {

};
