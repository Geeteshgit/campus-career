import mongoose from "mongoose";
import { IAuthUser } from "../types/models.js";
import { hashPassword } from "../utils/password.js";

const authUserSchema = new mongoose.Schema<IAuthUser>(
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
      enum: ["super_admin", "institution_admin", "student"],
      default: "student",
    },
    institution: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

authUserSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await hashPassword(this.password);
    next();
  } catch (err) {
    console.error("Error Hashing Password: ", err);
    next(err as Error);
  }
});

export const AuthUser = mongoose.model<IAuthUser>("User", authUserSchema);
