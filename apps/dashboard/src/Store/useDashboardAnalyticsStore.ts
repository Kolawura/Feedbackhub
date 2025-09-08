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
  setAnalytics: (data: DashboardAnalyticsData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useDashboardAnalyticsStore = create<DashboardAnalyticsStore>(
  (set) => ({
    analytics: null,
    loading: false,
    error: null,
    setAnalytics: (data) => set({ analytics: data }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
  })
);
