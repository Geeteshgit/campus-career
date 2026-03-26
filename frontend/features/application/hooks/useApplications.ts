"use client";

import {
  useApplyToJobMutation,
  useApplicantsForJobQuery,
  useMyApplicationsQuery,
} from "../api/applications.queries";
import { CreateApplicationPayload } from "../types/application.types";

export const useMyApplications = () => {
  return useMyApplicationsQuery();
};

export const useApplicantsForJob = (jobId: string) => {
  return useApplicantsForJobQuery(jobId);
};

export const useApplyToJob = () => {
  const { applyToJob, isPending: applyPending, ...rest } =
    useApplyToJobMutation();

  const handleApplyToJob = async (
    jobId: string,
    payload: CreateApplicationPayload,
  ) => {
    return applyToJob({ jobId, payload });
  };

  return {
    handleApplyToJob,
    applyPending,
    ...rest,
  };
};
