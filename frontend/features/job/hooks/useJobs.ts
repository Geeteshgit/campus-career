import type { Job, RecommendedJobsStudentPayload } from "../types/job.types";
import {
  useAllJobsQuery,
  useActiveJobsQuery,
  useInactiveJobsQuery,
  useRecommendedJobsQuery,
} from "./queries";

export const useAllJobs = () => {
  const {
    data: jobsData,
    isPending: jobsLoading,
    isError: jobsError,
    error: jobsErrorObj,
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
    jobsErrorObj,
  };
};

export const useActiveJobs = () => {
  const {
    data: activeJobsData,
    isPending: activeJobsLoading,
    isError: activeJobsError,
    error: activeJobsErrorObj,
  } = useActiveJobsQuery();

  const activeJobs: Job[] = activeJobsData?.jobs ?? [];

  return {
    activeJobs,
    activeJobsLoading,
    activeJobsError,
    activeJobsErrorObj,
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

export const useRecommendedJobs = (payload: RecommendedJobsStudentPayload) => {
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
