import mongoose, { Document } from "mongoose";

export interface IAuthUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "super_admin" | "admin" | "student";
}