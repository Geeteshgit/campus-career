import { jobsApi } from "@/lib/axios";

export const getAllJobs = async () => {
  const { data } = await jobsApi.get("/api/jobs");
  return data;
};

export const getJobStats = async () => {
  const { data } = await jobsApi.get("/api/jobs/stats");
  return data;
};

export const createJob = async (payload: any) => {
  const { data } = await jobsApi.post("/api/jobs", payload);
  return data;
};

export const getInactiveJobs = async () => {
  const { data } = await jobsApi.get("/api/jobs/inactive");
  return data;
};

export const getRecommendedJobs = async (payload: any) => {
  const { data } = await jobsApi.post("/api/jobs/recommendations", payload);
  return data;
};

export const updateJob = async (id: string, payload: any) => {
  const { data } = await jobsApi.put(`/api/jobs/${id}`, payload);
  return data;
};

export const deleteJob = async (id: string) => {
  const { data } = await jobsApi.delete(`/api/jobs/${id}`);
  return data;
};