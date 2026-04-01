import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateApplicationPayload } from "../types/application.types";
import { applyToJob } from "../api/applications.api";

export const useApplyToJobMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      jobId,
      payload,
    }: {
      jobId: string;
      payload: CreateApplicationPayload;
    }) => applyToJob(jobId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  return {
    applyToJob: mutation.mutateAsync,
    ...mutation,
  };
};
