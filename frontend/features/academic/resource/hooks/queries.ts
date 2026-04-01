import { useQuery } from "@tanstack/react-query";
import {
  getResources,
  getStudentResources,
} from "../api/resources.api";

export const useResourcesQuery = () => {
  return useQuery({
    queryKey: ["resources", "admin"],
    queryFn: getResources,
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useStudentResourcesQuery = (program: string) => {
  return useQuery({
    queryKey: ["resources", "student", program],
    queryFn: () => getStudentResources(program),
    enabled: !!program,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};