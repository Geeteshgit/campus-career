import mongoose from "mongoose";
import { IUser } from "../types/models.js";

const userSchema = new mongoose.Schema<IUser>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
      unique: true,
    },
    resume: {
      type: String,
    },
    skills: {
      type: [String],
    },
    academicRecord: {
      cgpa: {
        type: Number,
        min: [0, "CGPA cannot be negative"],
        max: [10, "CGPA cannot exceed 10"],
      },
      year: {
        type: Number,
        min: [1, "Year must be greater than or equal to 1"],
        max: [10, "Year must be less than or equal to 10"],
      },
      branch: {
        type: String,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);