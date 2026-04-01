import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AdminFormData } from "../schemas/admin.schema";
import {
  createAdmin,
  updateAdminById,
  deleteAdminById
} from "../api/admins.api";

export const useCreateAdminMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });

  return {
    createAdmin: mutation.mutateAsync,
    ...mutation,
  };
};

export const useUpdateAdminMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: AdminFormData }) =>
      updateAdminById(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });

  return {
    updateAdmin: mutation.mutateAsync,
    ...mutation,
  };
};

export const useDeleteAdminMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteAdminById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });

  return {
    deleteAdmin: mutation.mutateAsync,
    ...mutation,
  };
};
