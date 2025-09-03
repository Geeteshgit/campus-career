import mongoose from "mongoose";
import { IUser } from "../types/models.js";
import { hashPassword } from "../utils/password.js";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minLength: [2, "Name must be atleast 2 characters"],
      maxLength: [50, "Name must not exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be atleast 8 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["superadmin", "institutionadmin", "student"],
      default: "student",
    },
    institutionName: {
      type: String,
      required: [true, "Institution name is required"],
    },
    resume: {
      type: String,
    },
    skills: {
      type: [String],
      default: [],
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
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await hashPassword(this.password);
    next();
  } catch (err) {
    console.error("Error Hashing Password: ", err);
    next(err as Error);
  }
});

export const User = mongoose.model<IUser>("User", userSchema);
