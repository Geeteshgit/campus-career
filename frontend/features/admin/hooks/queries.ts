import { useQuery } from "@tanstack/react-query";
import { getAdminById, getAllAdmins } from "../api/admins.api";

export const useAdminsQuery = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: getAllAdmins,
  });
};

export const useAdminQuery = (id: string) => {
  return useQuery({
    queryKey: ["admins", id],
    queryFn: () => getAdminById(id),
    enabled: !!id,
  });
};
