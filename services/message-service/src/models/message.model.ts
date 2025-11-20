import mongoose from "mongoose";
import { IMessage } from "../types/models.js";

const MessageSchema = new mongoose.Schema<IMessage>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { 
      type: String, 
      required: true,
      minLength: [1, "Message must be atleast 1 character"],
      maxLength: [1000, "Message is too long"]
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
