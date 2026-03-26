"use client";

import {
  useAllJobsQuery,
  useInactiveJobsQuery,
  useRecommendedJobsQuery,
} from "../api/jobs.queries";
import { Job, RecommendedJobsStudentPayload } from "../types/job.types";

export const useAllJobs = () => {
  const {
    data: jobsData,
    isPending: jobsLoading,
    isError: jobsError,
    error: jobsErrorObject,
  } = useAllJobsQuery();

  const jobs: Job[] = jobsData?.jobs ?? [];
  const activeJobs = jobs.filter((job) => job.status === "Active");
  const inactiveJobs = jobs.filter((job) => job.status === "Inactive");

  return {
    jobs,
    activeJobs,
    inactiveJobs,
    jobsLoading,
    jobsError,
    jobsErrorObject,
  };
};

export const useInactiveJobs = () => {
  const {
    data: inactiveJJobsData,
    isPending: inactiveJobsLoading,
    isError: inactiveJobsError,
    error: inactiveJobsErrorObj,
  } = useInactiveJobsQuery();

  const inactiveJobs: Job[] = inactiveJJobsData?.jobs ?? [];

  return {
    inactiveJobs,
    inactiveJobsLoading,
    inactiveJobsError,
    inactiveJobsErrorObj,
  };
};

export const useRecommendedJobs = (
  payload: RecommendedJobsStudentPayload,
) => {
  const {
    data: recommendedJobsData,
    isPending: recommendedJobsLoading,
    isError: recommendedJobsError,
    error: recommendedJobsErrorObj,
  } = useRecommendedJobsQuery(payload);

  const recommendedJobs: Job[] = recommendedJobsData?.jobs ?? [];

  return {
    recommendedJobs,
    recommendedJobsLoading,
    recommendedJobsError,
    recommendedJobsErrorObj,
  };
};
