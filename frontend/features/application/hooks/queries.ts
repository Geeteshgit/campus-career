import { useQuery } from "@tanstack/react-query";
import {
  getMyApplications,
  getApplicantsForJob,
} from "../api/applications.api";

export const useMyApplicationsQuery = () => {
  return useQuery({
    queryKey: ["applications", "me"],
    queryFn: getMyApplications,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60,   // 1 hour
  });
};

export const useApplicantsForJobQuery = (jobId: string) => {
  return useQuery({
    queryKey: ["applications", "job", jobId],
    queryFn: () => getApplicantsForJob(jobId),
    enabled: !!jobId,
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};