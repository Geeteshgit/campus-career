import toast from "react-hot-toast";
import type { CreateApplicationPayload } from "../types/application.types";
import { useApplicantsForJobQuery, useMyApplicationsQuery } from "./queries";
import { useApplyToJobMutation } from "./mutations";

export const useMyApplications = () => {
  return useMyApplicationsQuery();
};

export const useApplicantsForJob = (jobId: string) => {
  return useApplicantsForJobQuery(jobId);
};

export const useApplyToJob = () => {
  const {
    applyToJob,
    isPending: applyPending,
    ...rest
  } = useApplyToJobMutation();

  const handleApplyToJob = async (
    jobId: string,
    payload: CreateApplicationPayload,
  ) => {
    try {
      const response = await applyToJob({ jobId, payload });
      toast.success("Applied successfully");
      return response;
    } catch (error) {
      toast.error("Failed to save");
      throw error;
    }
  };

  return {
    handleApplyToJob,
    applyPending,
    ...rest,
  };
};
