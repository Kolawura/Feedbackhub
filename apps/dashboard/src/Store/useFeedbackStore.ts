import { create } from "zustand";
import { Feedback } from "../Type";
import { fetch } from "../lib/axios";
import toast from "react-hot-toast";

interface FeedbackStore {
  feedbacks: Feedback[];
  loading: boolean;
  error: string | null;
  fetchFeedbacks: () => Promise<void>;
  fetchSiteFeedbacks: (siteId: string) => Promise<void>;
  fetchVisitorsFeedbacks: (visitorId: string) => Promise<void>;
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  feedbacks: [],
  loading: false,
  error: null,
  fetchFeedbacks: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/feedback/allFeedbacks");
      if (!res.data.success) throw new Error(res.data.message);
      const data: Feedback[] = res.data.data;
      set({ feedbacks: data, loading: false });
      toast.success(res.data.message);
    } catch (err: any) {
      set({ feedbacks: [], error: err.message, loading: false });
      toast.error(err.message);
    }
  },
  fetchSiteFeedbacks: async (siteId) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/feedback/${siteId}`);
      if (!res.data.success) throw new Error(res.data.message);
      const data: Feedback[] = res.data.data;
      set({ feedbacks: data, loading: false });
      toast.success(res.data.message);
    } catch (err: any) {
      set({ feedbacks: [], error: err.message, loading: false });
      toast.error(err.message);
    }
  },
  fetchVisitorsFeedbacks: async (visitorId) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/feedback/by-visitor/${visitorId}`);
      if (!res.data.success) throw new Error(res.data.message);
      const data: Feedback[] = res.data.data;
      set({ feedbacks: data, loading: false });
      toast.success(res.data.message);
    } catch (err: any) {
      set({ feedbacks: [], error: err.message, loading: false });
      toast.error(err.message);
    }
  },
}));
