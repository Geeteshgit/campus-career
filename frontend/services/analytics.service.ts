import { analyticsApi } from "@/lib/axios";

export const getPlatformAnalytics = async () => {
  const { data } = await analyticsApi.get("/analytics");
  return data;
};