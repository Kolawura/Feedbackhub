import { create } from "zustand";
import { Feedback } from "../Type";

interface FeedbackStore {
  feedbacks: Feedback[];
  loading: boolean;
  error: string | null;
  setFeedbacks: (feedbacks: Feedback[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  feedbacks: [],
  loading: false,
  error: null,
  setFeedbacks: (feedbacks) => set({ feedbacks }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
