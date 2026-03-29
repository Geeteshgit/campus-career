import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "../../api/programs.api";

const STALE_TIME = 1000 * 60 * 10; // 10 minutes
const CACHE_TIME = 1000 * 60 * 30; // 30 minutes

export const useProgramsQuery = () => {
  return useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
};
