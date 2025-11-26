import { Request, Response } from "express";
import { Student } from "../models/student.model.js";
import { User } from "../models/user.model.js";

export const getMyStudentProfile = async (req: any, res: Response) => {
  try {
    const profile = await Student.findOne({ userId: req.user._id });

    if (!profile)
      return res.status(404).json({ message: "Student profile not found" });

    return res
      .status(200)
      .json({ message: "Fetched student profile", profile });
  } catch (err) {
    console.error("Error Fetching Student Profile: ", err);
    return res.status(500).json({ message: "Failed to fetch student profile" });
  }
};

export const updateMyStudentProfile = async (req: any, res: Response) => {
  try {
    const updates = req.body;
    const updatedStudent = await Student.findOneAndUpdate(
      { userId: req.user._id },
      updates,
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Updated student profile", updatedStudent });
  } catch (err) {
    console.error("Error Updating Student Profile: ", err);
    return res
      .status(500)
      .json({ message: "Failed to update student profile" });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find().populate("userId");

    return res.status(200).json({ message: "Fetched all students", students });
  } catch (err) {
    console.error("Error Fetching Students: ", err);
    return res.status(500).json({ message: "Failed to fetch students" });
  }
};

export const getStudentByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const student = await Student.findOne({ userId }).populate("userId");

    if (!student) return res.status(404).json({ message: "Student not found" });

    return res.status(200).json({ message: "Fetched student", student });
  } catch (err) {
    console.error("Error Fetching Student: ", err);
    return res.status(500).json({ message: "Failed to fetch student" });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      enrollmentNumber,
      program,
      year,
      cgpa,
    } = req.body;

    const newStudent = new User({
      name,
      email,
      phone,
      password: `BUCC@#$${phone}`,
      role: "student",
    });

    await newStudent.save();

    const newStudentProfile = new Student({
      userId: newStudent._id,
      enrollmentNumber,
      program,
      year,
      cgpa,
      appliedJobs: [],
    });

    await newStudentProfile.save();

    return res.status(201).json({
      message: "Student created successfully",
      newStudent,
      newStudentProfile,
    });
  } catch (err) {
    console.error("Error Creating Student: ", err);
    return res.status(500).json({ message: "Failed to create student" });
  }
};