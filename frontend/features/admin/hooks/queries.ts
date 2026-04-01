import { useQuery } from "@tanstack/react-query";
import { getAdminById, getAllAdmins } from "../api/admins.api";

const staleTime = 1000 * 60 * 10; // 10 minutes
const cacheTime = 1000 * 60 * 60; // 1 hour

export const useAdminsQuery = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: getAllAdmins,
    staleTime: staleTime,
    gcTime: cacheTime,
  });
};

export const useAdminQuery = (id: string) => {
  return useQuery({
    queryKey: ["admins", id],
    queryFn: () => getAdminById(id),
    enabled: !!id,
    staleTime: staleTime,
    gcTime: cacheTime,
  });
};
