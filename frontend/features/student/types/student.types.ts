import { User } from "@/features/user";

export interface Student {
  _id: string;
  userId: string;
  enrollmentNumber: string;
  program: string;
  year: string;
  cgpa: number;
  batch: string;
  specialization: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
};

export type PopulatedStudent = Omit<Student, "userId"> & {
  userId: User;
};