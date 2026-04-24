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
    placeholderData: keepPreviousData,
  });
};

export const useVisitorsAnalytics = (siteId: string | null, range: string) => {
  return useQuery({
    queryKey: ["visitors", siteId || "all", range],
    queryFn: async () => {
      const url = siteId
        ? `/api/visitor/analytics/${siteId}?range=${range}`
        : `/api/visitor/analytics?range=${range}`;
      const res = await api.get(url);
      if (!res.data.success) throw new Error(res.data.message);
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};

export const useVisitorInsights = (siteId: string | null) => {
  return useQuery({
    queryKey: ["visitorInsights", siteId ?? "all"],
    queryFn: async () => {
      const url = siteId
        ? `/api/visitor/insights/${siteId}`
        : `/api/visitor/insights`;
      const res = await api.get(url);
      if (!res.data.success) throw new Error(res.data.message);
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
