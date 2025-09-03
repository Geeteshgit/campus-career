import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "super_admin" | "institution_admin" | "student";
  institution?: string;
  resume?: string;
  skills?: string[];
  academicRecord?: {
    cgpa: number;
    year: number;
    branch: string;
  };
}
