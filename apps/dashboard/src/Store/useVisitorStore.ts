import { create } from "zustand";

interface ChartInfo {
  labels: string[];
  data: number[];
  label: string;
}

interface VisitorState {
  analytics: Record<string, Record<string, ChartInfo>>;
  loading: boolean;
  error: string | null;
  setAnalytics: (analytics: Record<string, Record<string, ChartInfo>>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useVisitorStore = create<VisitorState>((set) => ({
  analytics: {},
  loading: false,
  error: null,
  setAnalytics: (analytics) => set({ analytics }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
