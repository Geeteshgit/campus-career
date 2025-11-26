import mongoose, { Document } from "mongoose";

export interface IApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  studentName: string;
  studentEmail: string;
  cgpa?: number;
  appliedOn: Date;
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

    studentName: {
      type: String,
      required: [true, "Student name is required"],
    },

    studentEmail: {
      type: String,
      required: [true, "Student email is required"],
    },

    cgpa: {
      type: Number,
      min: [0, "CGPA must be >= 0"],
      max: [10, "CGPA must be <= 10"],
    },

    appliedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model<IApplication>(
  "Application",
  applicationSchema
);
