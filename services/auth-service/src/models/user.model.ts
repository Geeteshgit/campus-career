import mongoose from "mongoose";
import { IUser } from "../types/models.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      firstName: {
        type: String,
        trim: true,
        required: [true, "First Name is required"],
        minLength: [2, "First name must be atleast 2 characters"],
        maxLength: [50, "First name must not exceed 50 characters"],
      },
      lastName: {
        type: String,
        trim: true,
      },
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
    institution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
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
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.error("Error Hashing Password: ", err);
    next(err as Error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword: string) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    console.error("Error Comparing Password: ", err);
  }
}

export const User = mongoose.model<IUser>("User", userSchema);
