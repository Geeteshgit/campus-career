import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,  
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minLength: [2, "Name must be at least 2 characters"],
      maxLength: [50, "Name must not exceed 50 characters"],
    },
    enrollmentNumber: {
      type: String,
      required: [true, "Enrollment number is required"],
      unique: true,
      trim: true,
      minLength: [5, "Enrollment number must be at least 5 characters"],
      maxLength: [20, "Enrollment number must not exceed 20 characters"],
    },
    program: {
      type: String,
      required: [true, "Program is required"],
      trim: true,
      minLength: [2, "Program name must be at least 2 characters"],
      maxLength: [50, "Program name must not exceed 50 characters"],
    },
    year: {
      type: String,
      required: [true, "Year is required"],
    },
    batch: {
      type: String,
      required: [true, "Batch is required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    cgpa: {
      type: Number,
      min: [0, "CGPA cannot be less than 0"],
      max: [10, "CGPA cannot exceed 10"],
    },
    skills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
