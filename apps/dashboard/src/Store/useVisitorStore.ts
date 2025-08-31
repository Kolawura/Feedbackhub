import { create } from "zustand";
import { fetch } from "../lib/axios";

interface ChartInfo {
  labels: string[];
  data: number[];
  label: string;
}

interface VisitorState {
  analytics: Record<string, Record<string, ChartInfo>>;
  loading: boolean;
  error: string | null;
  fetchAnalytics: (range: string, siteId: string) => Promise<void>;
}

export const useVisitorStore = create<VisitorState>((set) => ({
  analytics: {},
  loading: false,
  error: null,

  fetchAnalytics: async (range: string, siteId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/analytics/${siteId}?range=${range}`);

      set((state) => ({
        analytics: {
          ...state.analytics,
          [siteId]: {
            ...(state.analytics[siteId] || {}),
            [range]: res.data,
          },
        },
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch analytics",
        loading: false,
      });
    }
  },
}));
