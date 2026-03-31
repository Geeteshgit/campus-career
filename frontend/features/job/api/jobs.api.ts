import { jobsApi } from "@/lib/axios";
import type { RecommendedJobsStudentPayload } from "../types/job.types";
import type { JobPayload } from "../schemas/job.schema";

export const getAllJobs = async () => {
  const { data } = await jobsApi.get("/jobs");
  return data;
};

export const createJob = async (payload: JobPayload) => {
  const { data } = await jobsApi.post("/jobs", payload);
  return data;
};

export const getActiveJobs = async () => {
  const { data } = await jobsApi.get("/jobs/active");
  return data;
}

export const getInactiveJobs = async () => {
  const { data } = await jobsApi.get("/jobs/inactive");
  return data;
};

export const getRecommendedJobs = async (
  payload: RecommendedJobsStudentPayload,
) => {
  const { data } = await jobsApi.post("/jobs/recommendations", {
    student: payload,
  });
  return data;
};

export const updateJob = async (id: string, payload: JobPayload) => {
  const { data } = await jobsApi.put(`/jobs/${id}`, payload);
  return data;
};

export const deleteJob = async (id: string) => {
  const { data } = await jobsApi.delete(`/jobs/${id}`);
  return data;
};
