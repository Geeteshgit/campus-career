import mongoose, { Document } from "mongoose";

export interface IInstitution extends Document {
  institutionName: string;
  institutionCode: string;
  address: string;
  website: string;
  admins: string[];
  students: string[];
}
