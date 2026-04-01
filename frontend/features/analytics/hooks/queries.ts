import { useQuery } from "@tanstack/react-query";
import { getPlatformAnalytics } from "../api/analytics.api";

const staleTime = 1000 * 60 * 2; // 2 minutes
const cacheTime = 1000 * 60 * 10; // 10 minutes

export const usePlatformAnalyticsQuery = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: getPlatformAnalytics,
    staleTime: staleTime,
    gcTime: cacheTime,
  });
};
