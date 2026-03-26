"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyApplications,
  getApplicantsForJob,
  applyToJob,
} from "./applications.api";
import { CreateApplicationPayload } from "../types/application.types";

export const useMyApplicationsQuery = () => {
  return useQuery({
    queryKey: ["applications", "me"],
    queryFn: getMyApplications,
  });
};

export const useApplicantsForJobQuery = (jobId: string) => {
  return useQuery({
    queryKey: ["applications", "job", jobId],
    queryFn: () => getApplicantsForJob(jobId),
    enabled: !!jobId,
  });
};

export const useApplyToJobMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      jobId,
      payload,
    }: {
      jobId: string;
      payload: CreateApplicationPayload;
    }) => applyToJob(jobId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  return {
    applyToJob: mutation.mutateAsync,
    ...mutation,
  };
};
