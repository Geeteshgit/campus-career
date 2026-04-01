import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "../api/programs.api";

const staleTime = 1000 * 60 * 60 * 24; // 24 hours
const cacheTime = 1000 * 60 * 60 * 24 * 7; // 7 days

export const useProgramsQuery = () => {
  return useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
    staleTime: staleTime,
    gcTime: cacheTime,
  });
};
