import { IInstitution } from "../types/models.js";
import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema<IInstitution>(
  {
    name: {
      type: String,
      required: [true, "Institution name is required"],
      unique: true,
      trim: true,
      minLength: [3, "Institution name must be atleast 3 characters long"],
    },
    code: {
      type: String,
      unique: true,
      required: [true, "Institution code is required"],
      uppercase: true,
      match: [/^[A-Z0-9]+$/, "Institution code must be alphanumeric uppercase"],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Institution address is required"],
      maxLength: [200, "Institution address cannot exceed 200 characters"],
    },
    website: {
        type: String,
        trim: true,
    },
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Institution = mongoose.model<IInstitution>("Institution", institutionSchema);
