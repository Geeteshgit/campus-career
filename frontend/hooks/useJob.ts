import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllJobs,
  getJobStats,
  createJob,
  getInactiveJobs,
  getRecommendedJobs,
  updateJob,
  deleteJob
} from "@/services/job.service";

export const useAllJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getAllJobs,
  });
};

export const useJobStats = () => {
  return useQuery({
    queryKey: ["jobs", "stats"],
    queryFn: getJobStats,
  });
};

export const useInactiveJobs = () => {
  return useQuery({
    queryKey: ["jobs", "inactive"],
    queryFn: getInactiveJobs,
  });
};

export const useRecommendedJobs = () => {
  const mutation = useMutation({
    mutationFn: getRecommendedJobs,
  });

  return {
    getRecommendedJobs: mutation.mutateAsync,
    ...mutation,
  };
};

export const useCreateJob = () => {
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

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
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

export const useDeleteJob = () => {
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
