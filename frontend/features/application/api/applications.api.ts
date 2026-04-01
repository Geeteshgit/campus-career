import { jobsApi } from "@/lib/axios";
import type { CreateApplicationPayload } from "../types/application.types";

export const getMyApplications = async () => {
  const { data } = await jobsApi.get("/applications");
  return data;
};

export const getApplicantsForJob = async (jobId: string) => {
  const { data } = await jobsApi.get(`/applications/${jobId}`);
  return data;
};

export const applyToJob = async (jobId: string, payload: CreateApplicationPayload) => {
  const { data } = await jobsApi.post(`/applications/${jobId}`, payload);
  return data;
};