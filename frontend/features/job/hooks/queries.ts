import { useQuery } from "@tanstack/react-query";
import {
  getAllJobs,
  getInactiveJobs,
  getRecommendedJobs,
} from "../api/jobs.api";
import { RecommendedJobsStudentPayload } from "../types/job.types";

export const useAllJobsQuery = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getAllJobs,
  });
};

export const useInactiveJobsQuery = () => {
  return useQuery({
    queryKey: ["jobs", "inactive"],
    queryFn: getInactiveJobs,
  });
};

export const useRecommendedJobsQuery = (studentData: RecommendedJobsStudentPayload) => {
  const hasRecommendationInputs = Boolean(
    studentData?.program &&
      studentData?.year &&
      studentData?.specialization &&
      typeof studentData?.cgpa === "number" &&
      Array.isArray(studentData?.skills),
  );

  return useQuery({
    queryKey: ["recommendedJobs", studentData],
    queryFn: () => getRecommendedJobs(studentData),
    enabled: hasRecommendationInputs,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};