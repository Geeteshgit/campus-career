import { Request, Response } from "express";
import { Student } from "../models/student.model.js";
import { User } from "../models/user.model.js";
import { extractSkillsFromResume } from "../lib/extractSkillsFromResume.js";

export const getMyStudentProfile = async (req: any, res: Response) => {
  try {
    const profile = await Student.findOne({ userId: req.user.id });

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
      { userId: req.user.id },
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

export const uploadResumeAndExtractSkills = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded" });
    }

    const skills = await extractSkillsFromResume(req.file.buffer);

    if (!skills.length) {
      return res.status(400).json({ message: "Skill extraction failed" });
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { userId: req.user.id },
      { skills },
      { new: true }
    );

    return res.status(200).json({
      message: "Resume uploaded and skills updated",
      updatedStudent,
    });
  } catch (err) {
    console.error("Resume upload error:", err);
    return res.status(500).json({ message: "Failed to process resume" });
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

export const getStudentStats = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();

    const studentsPerProgram: Record<string, number> = {};
    const studentsPerYear: Record<string, number> = {};

    students.forEach((s) => {
      studentsPerProgram[s.program] = (studentsPerProgram[s.program] || 0) + 1;
      studentsPerYear[s.year] = (studentsPerYear[s.year] || 0) + 1;
    });

    return res.status(200).json({
      message: "Fetched student statistics",
      stats: { studentsPerProgram, studentsPerYear },
    });
  } catch (err) {
    console.error("Error Fetching Student Stats:", err);
    return res.status(500).json({ message: "Failed to fetch student stats" });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, enrollmentNumber, program, year, cgpa } =
      req.body;

    const newUser = new User({
      name,
      email,
      phone,
      password: `BUCC@#${phone}`,
      role: "student",
    });

    await newUser.save();

    const newStudentProfile = new Student({
      userId: newUser._id,
      enrollmentNumber,
      program,
      year,
      cgpa,
    });

    await newStudentProfile.save();

    const populatedStudent = await Student.findById(
      newStudentProfile._id
    ).populate("userId");

    return res.status(201).json({
      message: "Student created successfully",
      student: populatedStudent,
    });
  } catch (err) {
    console.error("Error Creating Student: ", err);
    return res.status(500).json({ message: "Failed to create student" });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const userUpdates: any = {};
    if (updates.name) userUpdates.name = updates.name;
    if (updates.email) userUpdates.email = updates.email;
    if (updates.phone) userUpdates.phone = updates.phone;

    if (Object.keys(userUpdates).length > 0) {
      await User.findByIdAndUpdate(student.userId, userUpdates, {
        new: true,
      });
    }

    const studentUpdates: any = {
      enrollmentNumber: updates.enrollmentNumber,
      program: updates.program,
      year: updates.year,
      cgpa: updates.cgpa,
    };

    const updatedStudent = await Student.findByIdAndUpdate(id, studentUpdates, {
      new: true,
    }).populate("userId");

    return res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    console.error("Error updating student:", err);
    return res.status(500).json({ message: "Failed to update student" });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndDelete(student.userId);

    await Student.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting student:", err);
    return res.status(500).json({
      message: "Failed to delete student",
    });
  }
};
