import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth.api";

const STALE_TIME = 1000 * 60 * 1; // 1 minute

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
    staleTime: STALE_TIME,
  });
};
