import { jobsApi } from "@/lib/axios";

export const getMyApplications = async () => {
  const { data } = await jobsApi.get("/api/applications");
  return data;
};

export const getApplicationStats = async () => {
  const { data } = await jobsApi.get("/api/applications/stats");
  return data;
};

export const getApplicantsForJob = async (jobId: string) => {
  const { data } = await jobsApi.get(`/api/applications/${jobId}`);
  return data;
};

export const applyToJob = async (jobId: string) => {
  const { data } = await jobsApi.post(`/api/applications/${jobId}`);
  return data;
};