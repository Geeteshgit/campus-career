import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IUser extends Document {
  name: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  password: string;
  role: "superadmin" | "institutionadmin" | "student";
  institution?: Schema.Types.ObjectId;
  resume?: string;
  skills?: string[];
  academicRecord?: {
    cgpa: number;
    year: number;
    branch: string;
  };
}

export interface IInstitution extends Document {
  name: string;
  code: string;
  address: string;
  website: string;
  admins: mongoose.Schema.Types.ObjectId[];
  students: mongoose.Schema.Types.ObjectId[];
}
