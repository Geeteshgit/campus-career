import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdminById,
  deleteAdminById
} from "../api/admins.api";

export const useAdmins = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: getAllAdmins,
  });
};

export const useAdmin = (id: string) => {
  return useQuery({
    queryKey: ["admins", id],
    queryFn: () => getAdminById(id),
    enabled: !!id
  });
};

export const useCreateAdmin = () => {
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

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
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

export const useDeleteAdmin = () => {
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
