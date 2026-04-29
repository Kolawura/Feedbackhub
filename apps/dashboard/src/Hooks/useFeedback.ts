import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { Feedback, VisitorSession } from "../Type";

export const useFeedbacks = (siteId?: string, visitorId?: string) => {
  const key = siteId
    ? ["siteFilteredFeedbacks", siteId]
    : visitorId
      ? ["visitorFilteredFeedbacks", visitorId]
      : ["feedbacks"];

  return useQuery<Feedback[]>({
    queryKey: key,
    queryFn: async () => {
      let url = "/api/feedback/allFeedbacks";
      if (siteId) url = `/api/feedback/${siteId}`;
      if (visitorId) url = `/api/feedback/by-visitor/${visitorId}`;
      const res = await api.get(url);
      if (!res.data.success) throw new Error(res.data.message);
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};

export const useVisitorHistory = (visitorId: string | null) => {
  return useQuery({
    queryKey: ["visitorHistory", visitorId],
    queryFn: async () => {
      const res = await api.get(`/api/feedback/by-visitor/${visitorId}`);
      if (!res.data.success) throw new Error(res.data.message);
      return res.data.data as {
        feedbacks: Feedback[];
        sessions: VisitorSession[];
        totalSessions: number;
        totalFeedback: number;
      };
    },
    enabled: !!visitorId,
    staleTime: 5 * 60 * 1000,
  });
};
