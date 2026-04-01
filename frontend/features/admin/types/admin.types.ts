import { Role } from "@/features/auth";

export interface Admin {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};