import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  userId: mongoose.Schema.Types.ObjectId; 
  resume?: string;
  skills?: string[];
  academicRecord?: {
    cgpa?: number;
    year?: number;
    branch?: string;
  };
}