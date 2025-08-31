import { create } from "zustand";
import { fetch } from "../lib/axios";

interface DashboardAnalyticsData {
  trend: number[];
  labels: string[];
  positive: number;
  negative: number;
}

interface DashboardAnalyticsStore {
  analytics: DashboardAnalyticsData | null;
  loading: boolean;
  error: string | null;
  fetchAnalytics: (siteId: string | null) => Promise<void>;
}

export const useDashboardAnalyticsStore = create<DashboardAnalyticsStore>(
  (set) => ({
    analytics: null,
    loading: false,
    error: null,

    fetchAnalytics: async (siteId: string | null) => {
      set({ loading: true, error: null }); // start loading

      try {
        const url = siteId
          ? `/api/feedback/dashboard/${siteId}`
          : `/api/feedback/dashboard`;

        const res = await fetch(url);

        set({
          analytics: res.data,
          loading: false,
          error: null,
        });
      } catch (err: any) {
        set({
          loading: false,
          error: err?.message || "Failed to fetch analytics",
        });
        console.error("Error fetching analytics:", err);
      }
    },
  })
);
