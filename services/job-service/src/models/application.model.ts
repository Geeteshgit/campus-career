import mongoose, { Document } from "mongoose";

export interface IApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  enrollmentNumber: string;
  program: string;
  year: string;
  cgpa: number;
}

const applicationSchema = new mongoose.Schema<IApplication>(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Student name is required"],
    },
    email: {
      type: String,
      required: [true, "Student email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    enrollmentNumber: {
      type: String,
      required: [true, "Enrollment number is required"],
    },
    program: {
      type: String,
      required: [true, "Program is required"],
    },
    year: {
      type: String,
      required: [true, "Year is required"],
    },
    cgpa: {
      type: Number,
      required: [true, "Student CGPA is required"],
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model<IApplication>(
  "Application",
  applicationSchema
);
