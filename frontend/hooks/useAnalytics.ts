import { useQuery } from "@tanstack/react-query";
import { getPlatformAnalytics } from "@/services/analytics.service";

const STALE_TIME = 1000 * 60 * 10; // 10 minutes

export const usePlatformAnalytics = () => {
  return useQuery({
    queryKey: ["analytics", "platform"],
    queryFn: getPlatformAnalytics,
    staleTime: STALE_TIME,
  });
};
