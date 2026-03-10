import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyApplications,
  getApplicationStats,
  getApplicantsForJob,
  applyToJob
} from "../api/applications.api";

export const useMyApplications = () => {
  return useQuery({
    queryKey: ["applications", "my"],
    queryFn: getMyApplications,
  });
};

export const useApplicationStats = () => {
  return useQuery({
    queryKey: ["applications", "stats"],
    queryFn: getApplicationStats,
  });
};

export const useApplicantsForJob = (jobId: string) => {
  return useQuery({
    queryKey: ["applications", "job", jobId],
    queryFn: () => getApplicantsForJob(jobId),
    enabled: !!jobId,
  });
};

export const useApplyToJob = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: applyToJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  return {
    applyToJob: mutation.mutateAsync,
    ...mutation,
  };
};
