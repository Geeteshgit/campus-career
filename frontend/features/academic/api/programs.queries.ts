"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPrograms,
  createProgram,
  deleteProgram
} from "./programs.api";

const STALE_TIME = 1000 * 60 * 10; // 10 minutes
const CACHE_TIME = 1000 * 60 * 30; // 30 minutes

export const useProgramsQuery = () => {
  return useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
};

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
