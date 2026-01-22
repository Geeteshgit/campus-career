import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Resource title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
    },
    url: {
      type: String,
      required: [true, "Resource URL is required"],
      trim: true,
    },
    program: {
      type: String,
      required: [true, "Program reference is required"],
      trim: true,
      minlength: [2, "Program must be at least 2 characters"],
    },
  },
  { timestamps: true }
);

export const Resource = mongoose.model("Resource", resourceSchema);
