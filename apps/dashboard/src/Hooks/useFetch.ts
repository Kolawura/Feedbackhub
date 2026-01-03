import { api } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useSetupStore } from "../Store/useSetupStore";
import { useDashboardAnalyticsStore } from "../Store/useDashboardAnalyticsStore";
import { useVisitorStore } from "../Store/useVisitorStore";
import { useFeedbackStore } from "../Store/useFeedbackStore";
import { Feedback } from "../Type";

export const loadSites = async () => {
  try {
    const response = await api.get("/api/site/all", {
      withCredentials: true,
    });
    useSetupStore.getState().setSites(response.data.sites);
    toast.success("Sites loaded");
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const addSite = async (name?: string) => {
  try {
    const response = await api.post(
      "/api/site/add",
      { name },
      { withCredentials: true }
    );
    const { success, newSite, sites, message } = response.data;

    if (success) {
      useSetupStore.getState().setSites(sites);
      toast.success(message);
      return { newSite, sites };
    }
  } catch (error: any) {
    toast.error("Failed to create site");
    return null;
  }
};

export const fetchAnalytics = async (siteId: string | null) => {
  useDashboardAnalyticsStore.getState().setLoading(true);
  useDashboardAnalyticsStore.getState().setError(null);

  try {
    const url = siteId
      ? `/api/feedback/dashboard/${siteId}`
      : `/api/feedback/dashboard`;

    const res = await api(url);

    useDashboardAnalyticsStore.getState().setAnalytics(res.data.data);
    useDashboardAnalyticsStore.getState().setLoading(false);
    useDashboardAnalyticsStore.getState().setError(null);
    if (!res.data.success) throw new Error(res.data.message);
  } catch (err: any) {
    useDashboardAnalyticsStore.getState().setLoading(false);
    useDashboardAnalyticsStore
      .getState()
      .setError(err?.message || "Failed to fetch analytics");
    console.error("Error fetching analytics:", err);
  }
};

export const fetchVisitorsAnalytics = async (range: string, siteId: string) => {
  useVisitorStore.getState().setLoading(true);
  useVisitorStore.getState().setError(null);
  try {
    const res = await api(`/api/analytics/${siteId}?range=${range}`);

    useVisitorStore.getState().setAnalytics({
      [siteId]: {
        [range]: res.data,
      },
    });
    useVisitorStore.getState().setLoading(false);
  } catch (err: any) {
    useVisitorStore
      .getState()
      .setError(err?.message || "Failed to fetch analytics");
    useVisitorStore.getState().setLoading(false);
    console.error("Error fetching analytics:", err);
  }
};

export const fetchFeedbacks = async () => {
  useFeedbackStore.getState().setLoading(true);
  useFeedbackStore.getState().setError(null);
  try {
    const res = await api("/api/feedback/allFeedbacks");
    if (!res.data.success) throw new Error(res.data.message);
    const data: Feedback[] = res.data.data;
    useFeedbackStore.getState().setFeedbacks(data);
    useFeedbackStore.getState().setLoading(false);
    toast.success(res.data.message);
  } catch (err: any) {
    useFeedbackStore.getState().setFeedbacks([]);
    useFeedbackStore.getState().setError(err.message);
    useFeedbackStore.getState().setLoading(false);
    toast.error(err.message);
  }
};
export const fetchSiteFeedbacks = async (siteId: string) => {
  useFeedbackStore.getState().setLoading(true);
  useFeedbackStore.getState().setError(null);
  try {
    const res = await api(`/api/feedback/${siteId}`);
    if (!res.data.success) throw new Error(res.data.message);
    const data: Feedback[] = res.data.data;
    useFeedbackStore.getState().setFeedbacks(data);
    useFeedbackStore.getState().setLoading(false);
    toast.success(res.data.message);
  } catch (err: any) {
    useFeedbackStore.getState().setFeedbacks([]);
    useFeedbackStore.getState().setError(err.message);
    useFeedbackStore.getState().setLoading(false);
    toast.error(err.message);
  }
};
export const fetchVisitorsFeedbacks = async (visitorId: string) => {
  useFeedbackStore.getState().setLoading(true);
  useFeedbackStore.getState().setError(null);
  try {
    const res = await api(`/api/feedback/by-visitor/${visitorId}`);
    if (!res.data.success) throw new Error(res.data.message);
    const data: Feedback[] = res.data.data;
    useFeedbackStore.getState().setFeedbacks(data);
    useFeedbackStore.getState().setLoading(false);
    toast.success(res.data.message);
  } catch (err: any) {
    useFeedbackStore.getState().setFeedbacks([]);
    useFeedbackStore.getState().setError(err.message);
    useFeedbackStore.getState().setLoading(false);
    toast.error(err.message);
  }
};
