import { jobsApi } from "@/lib/axios";
import { CreateJobPayload, RecommendedJobsStudentPayload, UpdateJobPayload } from "../types/job.types";

export const getAllJobs = async () => {
  const { data } = await jobsApi.get("/jobs");
  return data;
};

export const createJob = async (payload: CreateJobPayload) => {
  const { data } = await jobsApi.post("/jobs", payload);
  return data;
};

export const getInactiveJobs = async () => {
  const { data } = await jobsApi.get("/jobs/inactive");
  return data;
};

export const getRecommendedJobs = async (payload: RecommendedJobsStudentPayload) => {
  const { data } = await jobsApi.post("/jobs/recommendations", { student: payload });
  return data;
};

export const updateJob = async (id: string, payload: UpdateJobPayload) => {
  const { data } = await jobsApi.put(`/jobs/${id}`, payload);
  return data;
};

export const deleteJob = async (id: string) => {
  const { data } = await jobsApi.delete(`/jobs/${id}`);
  return data;
};