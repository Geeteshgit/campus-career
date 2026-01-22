import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Program name is required"],
      unique: true,
      trim: true,
      minlength: [2, "Program name must be at least 2 characters"],
      maxlength: [50, "Program name must not exceed 50 characters"],
    },
  },
  { timestamps: true }
);

export const Program = mongoose.model("Program", programSchema);
