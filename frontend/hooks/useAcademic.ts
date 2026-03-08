import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPrograms,
  createProgram,
  deleteProgram
} from "@/services/academic.service";

const STALE_TIME = 1000 * 60 * 10; // 10 minutes
const CACHE_TIME = 1000 * 60 * 30; // 30 minutes

export const usePrograms = () => {
  return useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
};

export const useCreateProgram = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
    retry: 1,
  });

  return {
    createProgram: mutation.mutateAsync,
    ...mutation,
  };
};

export const useDeleteProgram = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
    retry: 1,
  });

  return {
    deleteProgram: mutation.mutateAsync,
    ...mutation,
  };
};
