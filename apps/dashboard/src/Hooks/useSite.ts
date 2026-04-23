import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import toast from "react-hot-toast";
import { Site, WidgetConfig } from "../Type";

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
        { withCredentials: true },
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

  const renameSiteMutation = useMutation({
    mutationFn: async ({ siteId, name }: { siteId: string; name: string }) => {
      const res = await api.patch(
        `/api/site/rename/${siteId}`,
        { name },
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Site renamed");
      queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
    onError: () => toast.error("Failed to rename site"),
  });

  const updateConfigMutation = useMutation({
    mutationFn: async ({
      siteId,
      config,
    }: {
      siteId: string;
      config: WidgetConfig;
    }) => {
      const res = await api.patch(`/api/site/config/${siteId}`, config);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Widget config saved");
      queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
    onError: () => toast.error("Failed to save widget config"),
  });

  const deleteSiteMutation = useMutation({
    mutationFn: async (siteId: string) => {
      const res = await api.delete(`/api/site/${siteId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Site deleted");
      queryClient.invalidateQueries({ queryKey: ["sites"] });
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
    onError: () => toast.error("Failed to delete site"),
  });

  return {
    sitesQuery,
    addSiteMutation,
    renameSiteMutation,
    updateConfigMutation,
    deleteSiteMutation,
  };
};
