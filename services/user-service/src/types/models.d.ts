import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  userId: mongoose.Schema.Types.ObjectId; 
  phone?: string;
  permissions: string[];
}