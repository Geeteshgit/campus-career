import { Job } from "@/features/job";

export interface Application {
  _id: string;
  jobId: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  enrollmentNumber: string;
  program: string;
  year: string;
  batch: string;
  specialization: string;
  cgpa: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateApplicationPayload = Omit<
  Application,
  "_id" | "jobId" | "studentId" | "email" | "createdAt" | "updatedAt"
>;

export type Applicant = Omit<
  Application,
  "_id" | "jobId" | "studentId" | "createdAt" | "updatedAt"
> & {
  appliedOn: string;
};

export type PopulatedApplication = Omit<Application, "jobId"> & {
  jobId: Job;
};
