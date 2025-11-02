import mongoose from "mongoose";
import { IStudent } from "../types/models.js";

const studentSchema = new mongoose.Schema<IStudent>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    enrollmentNo: {
      type: String,
      required: [true, "Enrollment number is required"],
      unique: [true, "Enrollment number must be unique"],
      trim: true,
      minLength: [5, "Enrollment number must be at least 5 characters"],
      maxLength: [20, "Enrollment number must not exceed 20 characters"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
      minLength: [2, "Department name must be at least 2 characters"],
      maxLength: [50, "Department name must not exceed 50 characters"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1, "Year must be at least 1"],
      max: [5, "Year must not exceed 5"],
    },
    skills: {
      type: [String],
      default: [],
    },
    resume: {
      type: String,
      trim: true,
    },
    cgpa: {
      type: Number,
      min: [0, "CGPA cannot be less than 0"],
      max: [10, "CGPA cannot exceed 10"],
    },
    appliedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true }
);

export const Student = mongoose.model<IStudent>("Student", studentSchema);
