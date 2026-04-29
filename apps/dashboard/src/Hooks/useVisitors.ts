import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { VisitorSummary, VisitorDetail } from "../Type";

// List all unique visitors (paginated)
export const useAllVisitors = (siteId: string | null, page = 1, limit = 20) => {
  return useQuery<{
    data: VisitorSummary[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>({
    queryKey: ["visitors", siteId ?? "all", page, limit],
    queryFn: async () => {
      const url = siteId
        ? `/api/visitor/all/${siteId}?page=${page}&limit=${limit}`
        : `/api/visitor/all?page=${page}&limit=${limit}`;
      const res = await api.get(url);
      return { data: res.data.data, pagination: res.data.pagination };
    },
    staleTime: 2 * 60 * 1000,
    enabled: true,
  });
};

// Full detail for one visitor
export const useVisitorDetail = (visitorId: string | null) => {
  return useQuery<VisitorDetail>({
    queryKey: ["visitorDetail", visitorId],
    queryFn: async () => {
      const res = await api.get(`/api/visitor/detail/${visitorId}`);
      return res.data.data;
    },
    enabled: !!visitorId,
    staleTime: 2 * 60 * 1000,
  });
};
