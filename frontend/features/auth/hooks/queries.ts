import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth.api";

const staleTime = 1000 * 60 * 5; // 5 minutes
const cacheTime = 1000 * 60 * 30; // 30 minutes

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
    staleTime: staleTime,
    gcTime: cacheTime,
  });
};
