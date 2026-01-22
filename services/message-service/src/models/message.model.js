import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    message: { 
      type: String, 
      required: true,
      minLength: [1, "Message must be atleast 1 character"],
      maxLength: [1000, "Message is too long"],
      trim: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", MessageSchema);
