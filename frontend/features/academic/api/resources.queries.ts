"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getResources,
  getStudentResources,
  createResource,
  updateResource,
  deleteResource,
} from "./resources.api";
import { UpdateResourcePayload } from "../types/resource.types";

export const useResourcesQuery = () => {
  return useQuery({
    queryKey: ["resources", "admin"],
    queryFn: getResources,
  });
};

export const useStudentResourcesQuery = (program: string) => {
  return useQuery({
    queryKey: ["resources", "student", program],
    queryFn: () => getStudentResources(program),
    enabled: !!program
  });
};

export const useCreateResourceMutation = () => {
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

export const useUpdateResourceMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateResourcePayload }) =>
      updateResource(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    }
  });

  return {
    updateResource: mutation.mutateAsync,
    ...mutation,
  };
};

export const useDeleteResourceMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    }
  });

  return {
    deleteResource: mutation.mutateAsync,
    ...mutation,
  };
};
