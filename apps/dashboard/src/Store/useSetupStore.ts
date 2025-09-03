import { create } from "zustand";
import { fetch } from "../lib/axios";
import { toast } from "react-hot-toast";
import { persist } from "zustand/middleware";
import { Site } from "../Type";

interface SetupState {
  sites: Site[];
  setupLoading: boolean;
  setSites: (sites: Site) => void;
  setSetupLoading: (loading: boolean) => void;
  selectedSiteId: string | null;
  selectSiteId: (siteId: string) => void;
  widgetPosition: string;
  setWidgetPosition: (position: string) => void;
  addSite: (name: string) => Promise<Site | null>;
}

export const useSetupStore = create<SetupState>()((set) => ({
  sites: [],
  setupLoading: false,
  selectedSiteId: null,
  setSites: (site) =>
    set((state) => {
      return { sites: [...state.sites, site] };
    }),
  selectSiteId: (siteId) =>
    set((state) =>
      state.sites.some((site) => site.siteId === siteId)
        ? { selectedSiteId: siteId }
        : state
    ),

  setSetupLoading: (loading) => set({ setupLoading: loading }),
  widgetPosition: "bottom-right",
  setWidgetPosition: (position) => set({ widgetPosition: position }),

  addSite: async (name) => {
    try {
      set({ setupLoading: true });

      const response = await fetch.post(
        "/api/site/add",
        { name },
        { withCredentials: true }
      );

      const { success, newSite, sites, message } = response.data;
      console.log(sites);

      if (success) {
        set({ sites: sites });
        toast.success(message);
        console.log("After set, store sites:", useSetupStore.getState().sites);
        return newSite;
      } else {
        toast.error(message);
        return null;
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      set({ setupLoading: false });
    }
  },
}));
