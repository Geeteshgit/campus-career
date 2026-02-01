import { Student } from "../models/student.model.js";
import { User } from "../models/user.model.js";
import { extractSkillsFromResume } from "../lib/extractSkillsFromResume.js";
import XLSX from "xlsx";
import { hashPassword } from "../utils/password.js";

export const getMyStudentProfile = async (req, res) => {
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

export const updateMyStudentProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updatedStudent = await Student.findOneAndUpdate(
      { userId: req.user.id },
      updates,
      { new: true },
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

export const uploadResumeAndExtractSkills = async (req, res) => {
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
      { new: true },
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

export const getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * 50;
    const filter = {};

    if (req.query.program && req.query.program !== "All") {
      filter.program = req.query.program;
    }

    if (req.query.year && req.query.year !== "All") {
      filter.year = req.query.year;
    }

    if (req.query.search) {
      filter.$or = [
        { enrollmentNumber: { $regex: req.query.search, $options: "i" } },
        { name: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const students = await Student.find(filter)
      .populate("userId")
      .sort({ enrollmentNumber: 1 })
      .skip(skip)
      .limit(50);

    const total = await Student.countDocuments(filter);
    return res.status(200).json({
      message: "Fetched all students",
      students,
      hasMore: skip + students.length < total,
    });
  } catch (err) {
    console.error("Error Fetching Students: ", err);
    return res.status(500).json({ message: "Failed to fetch students" });
  }
};

export const getStudentByUserId = async (req, res) => {
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

export const getStudentStats = async (req, res) => {
  try {
    const students = await Student.find();

    const studentsPerProgram = {};
    const studentsPerYear = {};

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

export const createStudent = async (req, res) => {
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
      name,
      enrollmentNumber,
      program,
      year,
      batch,
      specialization,
      cgpa,
    });

    await newStudentProfile.save();

    const populatedStudent = await Student.findById(
      newStudentProfile._id,
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

export const bulkCreateStudents = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const students = XLSX.utils.sheet_to_json(worksheet);

    if (!students.length) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    const emails = students.map((s) => s.email);

    const existingUsers = await User.find(
      { email: { $in: emails } },
      { email: 1 },
    );
    const existingEmailSet = new Set(existingUsers.map((u) => u.email));

    const newStudents = students.filter((s) => !existingEmailSet.has(s.email));

    const usersToInsert = await Promise.all(
      newStudents.map(async (s) => ({
        name: s.name,
        email: s.email,
        phone: s.phone,
        password: await hashPassword(`BUCC@#${s.phone}`),
        role: "student",
      })),
    );

    const createdUsers = await User.insertMany(usersToInsert);

    const studentsToInsert = createdUsers.map((user, index) => ({
      userId: user._id,
      name: newStudents[index].name,
      enrollmentNumber: newStudents[index].enrollmentNumber,
      program: newStudents[index].program,
      year: newStudents[index].year,
      batch: newStudents[index].batch,
      specialization: newStudents[index].specialization,
      cgpa: newStudents[index].cgpa,
    }));

    await Student.insertMany(studentsToInsert);

    return res.status(201).json({
      message: "Bulk upload successful",
      created: studentsToInsert.length,
      skipped: students.length - studentsToInsert.length,
    });
  } catch (err) {
    console.error("Bulk upload error:", err);
    return res.status(500).json({ message: "Bulk upload failed" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const userUpdates = {};
    if (updates.name) userUpdates.name = updates.name;
    if (updates.email) userUpdates.email = updates.email;
    if (updates.phone) userUpdates.phone = updates.phone;

    if (Object.keys(userUpdates).length > 0) {
      await User.findByIdAndUpdate(student.userId, userUpdates, {
        new: true,
      });
    }

    const studentUpdates = {
      enrollmentNumber: updates.enrollmentNumber,
      program: updates.program,
      year: updates.year,
      batch: updates.batch,
      specialization: updates.specialization,
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

export const deleteStudent = async (req, res) => {
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
