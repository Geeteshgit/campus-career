import { useQuery } from "@tanstack/react-query";
import { getPlatformAnalytics } from "./analytics.api";

const STALE_TIME = 1000 * 60 * 10; // 10 minutes

export const usePlatformAnalyticsQuery = () => {
  return useQuery({
    queryKey: ["analytics", "platform"],
    queryFn: getPlatformAnalytics,
    staleTime: STALE_TIME,
  });
};
