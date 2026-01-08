import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";

export const useDashboardAnalytics = (siteId: string | null) => {
  return useQuery({
    queryKey: ["analytics", siteId || "all"],
    queryFn: async () => {
      const url = siteId
        ? `/api/feedback/analytics/${siteId}`
        : `/api/feedback/analytics`;
      const res = await api.get(url);
      if (!res.data.success) throw new Error(res.data.message);
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!siteId,
    placeholderData: keepPreviousData,
  });
};

export const useVisitorsAnalytics = (siteId: string | null, range: string) => {
  return useQuery({
    queryKey: ["visitors", siteId, range],
    queryFn: async () => {
      if (!siteId) throw new Error("Site ID is required");
      const res = await api.get(
        `/api/visitor/analytics/${siteId}?range=${range}`
      );
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!siteId,
    placeholderData: keepPreviousData,
  });
};
