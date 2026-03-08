import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getResources,
  getStudentResources,
  createResource,
  updateResource,
  deleteResource,
} from "@/services/resource.service";

export const useResources = () => {
  return useQuery({
    queryKey: ["resources", "admin"],
    queryFn: getResources,
  });
};

export const useStudentResources = (program: string) => {
  return useQuery({
    queryKey: ["resources", "student", program],
    queryFn: () => getStudentResources(program),
    enabled: !!program,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
};

export const useCreateResource = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });

  return {
    createResource: mutation.mutateAsync,
    ...mutation,
  };
};

export const useUpdateResource = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateResource(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    retry: 1,
  });

  return {
    updateResource: mutation.mutateAsync,
    ...mutation,
  };
};

export const useDeleteResource = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    retry: 1,
  });

  return {
    deleteResource: mutation.mutateAsync,
    ...mutation,
  };
};
