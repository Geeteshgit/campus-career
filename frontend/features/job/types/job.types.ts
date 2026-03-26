import { Role } from "@/features/auth";
import { Student } from "@/features/student";

export interface Job {
  _id: string;
  company: string;
  role: Role;
  location: string;
  deadline: string;
  description: string;
  requirements: string[];
  eligibility: string;
  package: string;
  positions: number;
  type: "Full-Time" | "Internship";
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export type CreateJobPayload = Omit<Job, "_id" | "createdAt" | "updatedAt">;

export type UpdateJobPayload = Partial<CreateJobPayload>;

export type JobFormData = Omit<CreateJobPayload, "requirements"> & {
  requirements: string;
};

export type RecommendedJobsStudentPayload = Omit<
  Student,
  "_id" | "userId" | "enrollmentNumber" | "batch" | "createdAt" | "updatedAt"
>;
