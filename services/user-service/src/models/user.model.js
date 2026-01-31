import mongoose from "mongoose";
import { hashPassword } from "../utils/password.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minLength: [2, "Name must be at least 2 characters"],
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
      minLength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["super_admin", "admin", "student"],
      default: "student",
    },
    phone: {
      type: String,
      trim: true,
      required: false,
    },
    resetPasswordOtp: {
      type: String,
      trim: true,
    },
    resetPasswordOtpExpires: {
      type: Date
    },
    resetPasswordOtpVerified: {
      type: Boolean,
      defaault: false,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await hashPassword(this.password);
    next();
  } catch (err) {
    console.error("Error hashing password:", err);
    next(err);
  }
});

export const User = mongoose.model("User", userSchema);
