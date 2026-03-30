import { useQuery } from "@tanstack/react-query";
import {
  getResources,
  getStudentResources,
} from "../api/resources.api";

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