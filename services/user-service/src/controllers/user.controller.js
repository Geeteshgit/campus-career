import { User } from "../models/user.model.js";
import { env } from "../config/env.js";

export const getMyAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID missing in request" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({
      message: "Fetched profile",
      user,
    });
  } catch (err) {
    console.error("Error Fetching My Profile: ", err);
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const admins = await User.countDocuments({
      role: { $in: ["admin", "super_admin"] },
    });
    const students = await User.countDocuments({ role: "student" });

    return res.status(200).json({
      message: "Fetched user statistics",
      stats: { totalUsers, admins, students },
    });
  } catch (err) {
    console.error("Error Fetching User Stats:", err);
    return res.status(500).json({ message: "Failed to fetch user stats" });
  }
};

export const updateMyAccount = async (req, res) => {
  try {
    const { phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { phone },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ message: "Profile updated", updatedUser });
  } catch (err) {
    console.error("Error Updating Profile: ", err);
    return res.status(500).json({ message: "Failed to update profile" });
  }
};


