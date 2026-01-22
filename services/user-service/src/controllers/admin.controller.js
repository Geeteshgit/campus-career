import { User } from "../models/user.model.js";
import { Student } from "../models/student.model.js";

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: { $in: ["admin", "super_admin"] } });

    return res.status(200).json({
      message: "Admins fetched successfully",
      admins,
    });
  } catch (err) {
    console.error("Error fetching admins:", err);
    return res.status(500).json({ message: "Failed to fetch admins" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ message: "Fetched user", user });
  } catch (err) {
    console.error("Error Fetching User Profile: ", err);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({ message: "Updated user", updatedUser });
  } catch (err) {
    console.error("Error Updating User Profile: ", err);
    return res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    if (user.role === "student") {
      await Student.findOneAndDelete({ userId: id });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("Error Deleting User: ", err);
    return res.status(500).json({ message: "Failed to delete user" });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const admin = new User({
      name,
      email,
      phone,
      password: `BUCC@#${phone}`,
      role: "admin",
    });

    await admin.save();

    return res.status(201).json({
      message: "Admin created",
      admin,
    });
  } catch (err) {
    console.error("Error Creating Admin: ", err);
    return res.status(500).json({ message: "Failed to create admin" });
  }
};
