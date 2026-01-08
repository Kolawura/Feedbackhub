import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import toast from "react-hot-toast";
import { Site } from "../Type";

export const useSites = () => {
  const queryClient = useQueryClient();

  const sitesQuery = useQuery<Site[]>({
    queryKey: ["sites"],
    queryFn: async () => {
      const res = await api.get("/api/site/all", { withCredentials: true });
      return res.data.sites;
    },
    staleTime: Infinity,
  });

  const addSiteMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await api.post(
        "/api/site/add",
        { name },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        queryClient.setQueryData(["sites"], data.sites);
      }
    },
    onError: () => toast.error("Failed to create site"),
  });

  return { sitesQuery, addSiteMutation };
};
