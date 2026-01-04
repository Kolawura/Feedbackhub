import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { Feedback } from "../Type";
import toast from "react-hot-toast";

export const useFeedbacks = (siteId?: string, visitorId?: string) => {
  const key = siteId
    ? ["feedbacks", siteId]
    : visitorId
    ? ["feedbacks", visitorId]
    : ["feedbacks"];

  return useQuery<Feedback[]>({
    queryKey: key,
    queryFn: async () => {
      let url = "/api/feedback/allFeedbacks";
      if (siteId) url = `/api/feedback/${siteId}`;
      if (visitorId) url = `/api/feedback/by-visitor/${visitorId}`;
      const res = await api.get(url);
      if (!res.data.success) throw new Error(res.data.message);
      toast.success(res.data.message);
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
