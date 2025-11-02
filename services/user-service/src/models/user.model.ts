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
    phone: {
      type: String,
      trim: true,
    },
    permissions: {
      type: [String],
      default: [],
    }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);