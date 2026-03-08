import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyApplications,
  getApplicationStats,
  getApplicantsForJob,
  applyToJob
} from "@/services/application.service";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes
const CACHE_TIME = 1000 * 60 * 10; // 10 minutes

export const useMyApplications = () => {
  return useQuery({
    queryKey: ["applications", "my"],
    queryFn: getMyApplications,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
};

export const useApplicationStats = () => {
  return useQuery({
    queryKey: ["applications", "stats"],
    queryFn: getApplicationStats,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
};

export const useApplicantsForJob = (jobId: string) => {
  return useQuery({
    queryKey: ["applications", "job", jobId],
    queryFn: () => getApplicantsForJob(jobId),
    enabled: !!jobId,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
};

export const useApplyToJob = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: applyToJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["applications", "my"] });
    },
    retry: 1,
  });

  return {
    applyToJob: mutation.mutateAsync,
    ...mutation,
  };
};
