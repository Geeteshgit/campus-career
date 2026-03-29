import { useQuery } from "@tanstack/react-query";
import {
  getMyApplications,
  getApplicantsForJob,
} from "../api/applications.api";

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