import mongoose, { Document } from "mongoose";
import { hashPassword } from "../utils/password.js";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "super_admin" | "admin" | "student";
  phone: string;
}

const userSchema = new mongoose.Schema<IUser>(
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
      match: [/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, "Invalid email format"],
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
      match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
    },
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
    next(err as Error);
  }
});

export const User = mongoose.model<IUser>("User", userSchema);
