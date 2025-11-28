import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { IUser } from "../models/user.model.js";

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

    const user = await User.findById(req.user.id).select("+password");

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

export const getMe = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    console.error("Error fetching current user: ", err);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};
