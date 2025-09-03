import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "institutionadmin" | "student";
  institutionName?: string;
  resume?: string;
  skills?: string[];
  academicRecord?: {
    cgpa: number;
    year: number;
    branch: string;
  };
}
