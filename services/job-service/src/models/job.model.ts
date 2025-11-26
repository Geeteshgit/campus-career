import mongoose, { Document } from "mongoose";

export interface IJob extends Document {
  company: string;
  role: string;
  location: string;
  salary: string;
  deadline: string;
  description: string;
  requirements: string[];
  eligibility: string;
  package: string;
  positions: number;
  type: "Full-time" | "Internship";
  status: "Active" | "Inactive";
}

const jobSchema = new mongoose.Schema<IJob>(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minLength: [2, "Company name must be at least 2 characters"],
      maxLength: [100, "Company name must not exceed 100 characters"],
    },

    role: {
      type: String,
      required: [true, "Job role is required"],
      trim: true,
      minLength: [2, "Job role must be at least 2 characters"],
      maxLength: [100, "Job role must not exceed 100 characters"],
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      minLength: [2, "Location must be at least 2 characters"],
      maxLength: [100, "Location must not exceed 100 characters"],
    },

    salary: {
      type: String,
      required: [true, "Salary is required"],
      trim: true,
    },

    deadline: {
      type: String,
      required: [true, "Application deadline is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      minLength: [10, "Description must be at least 10 characters"],
    },

    requirements: {
      type: [String],
      required: [true, "Requirements are required"],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "At least one requirement must be provided",
      },
    },

    eligibility: {
      type: String,
      required: [true, "Eligibility criteria is required"],
      trim: true,
    },

    positions: {
      type: Number,
      required: [true, "Number of positions is required"],
      min: [1, "At least one position is required"],
    },

    type: {
      type: String,
      required: [true, "Job type is required"],
      trim: true,
      enum: {
        values: ["Full-time", "Internship"],
        message: "Job type must be Full-time or Internship",
      },
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJob>("Job", jobSchema);
