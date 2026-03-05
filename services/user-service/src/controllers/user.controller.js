import { User } from "../models/user.model.js";

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
