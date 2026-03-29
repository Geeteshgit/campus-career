import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProgram, deleteProgram } from "../../api/programs.api";

export const useCreateProgramMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });

  return {
    createProgram: mutation.mutateAsync,
    ...mutation,
  };
};

export const useDeleteProgramMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });

  return {
    deleteProgram: mutation.mutateAsync,
    ...mutation,
  };
};
