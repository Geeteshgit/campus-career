import { jobsApi } from "@/lib/axios";

export const getMyApplications = async () => {
  const { data } = await jobsApi.get("/applications");
  return data;
};

export const getApplicationStats = async () => {
  const { data } = await jobsApi.get("/applications/stats");
  return data;
};

export const getApplicantsForJob = async (jobId: string) => {
  const { data } = await jobsApi.get(`/applications/${jobId}`);
  return data;
};

export const applyToJob = async (jobId: string) => {
  const { data } = await jobsApi.post(`/applications/${jobId}`);
  return data;
};