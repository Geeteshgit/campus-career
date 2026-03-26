"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllJobs,
  createJob,
  getInactiveJobs,
  getRecommendedJobs,
  updateJob,
  deleteJob
} from "./jobs.api";
import { RecommendedJobsStudentPayload, UpdateJobPayload } from "../types/job.types";

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

export const useCreateJobMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  return {
    createJob: mutation.mutateAsync,
    ...mutation,
  };
};

export const useUpdateJobMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateJobPayload }) =>
      updateJob(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  return {
    updateJob: mutation.mutateAsync,
    ...mutation,
  };
};

export const useDeleteJobMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  return {
    deleteJob: mutation.mutateAsync,
    ...mutation,
  };
};
