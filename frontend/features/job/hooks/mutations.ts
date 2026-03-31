import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob, deleteJob, updateJob } from "../api/jobs.api";
import type { JobPayload } from "../schemas/job.schema";

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
    mutationFn: ({ id, payload }: { id: string; payload: JobPayload }) =>
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
