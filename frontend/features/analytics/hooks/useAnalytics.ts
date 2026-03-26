"use client";

import { usePlatformAnalyticsQuery } from "../api/analytics.queries";

export const useAnalytics = () => {
  const {
    data: analyticsData,
    isPending: analyticsLoading,
    isError: analyticsError,
    error: analyticsErrorObj,
  } = usePlatformAnalyticsQuery();

  const analytics = analyticsData?.analytics;

  return { analytics, analyticsLoading, analyticsError, analyticsErrorObj };
};
