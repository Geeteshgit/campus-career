import mongoose from "mongoose";
import { IInstitution } from "../types/models.js";

const institutionSchema = new mongoose.Schema<IInstitution>(
  {
    institutionName: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true,
      minLength: [2, "Name must be atleast 2 characters"],
    },
    institutionCode: {
      type: String,
      required: [true, "Institution code is require"],
      trim: true,
      minLength: [2, "Institution code must be atleast 2 characters"],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Address is required"],
      minLength: [3, "Address must be atleast 3 characters"],
    },
    website: {
      type: String,
      trim: true,
    },
    admins: {
      type: [String],
      default: [],
    },
    students: {
      type: [String],
      default: [],
    }
  },
  { timestamps: true }
);

export const Institution = mongoose.model<IInstitution>("Institution", institutionSchema);