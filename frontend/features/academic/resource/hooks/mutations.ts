import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ResourceFormData } from "../schemas/resource.schema";
import {
  createResource,
  deleteResource,
  updateResource,
} from "../api/resources.api";

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
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ResourceFormData;
    }) => updateResource(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
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
    },
  });

  return {
    deleteResource: mutation.mutateAsync,
    ...mutation,
  };
};
