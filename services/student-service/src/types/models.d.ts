import mongoose, { Document } from "mongoose";

export interface IStudent extends Document {
  userId: mongoose.Schema.Types.ObjectId; 
  enrollmentNo: string;
  department: string;
  year: number;
  skills: string[];
  resume: string;
  cgpa?: number;
  appliedJobs?: ObjectId[];
}