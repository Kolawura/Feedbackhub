import { create } from "zustand";
import { Site } from "../Type";

interface SetupState {
  sites: Site[];
  setupLoading: boolean;
  selectedSiteId: string | null;
  widgetPosition: string;
  setSites: (sites: Site[]) => void;
  addSite: (site: Site) => void;
  selectSiteId: (siteId: string | null) => void;
  setSetupLoading: (loading: boolean) => void;
  setWidgetPosition: (position: string) => void;
}

export const useSetupStore = create<SetupState>((set) => ({
  sites: [],
  setupLoading: false,
  selectedSiteId: null,
  widgetPosition: "bottom-right",

  setSites: (sites) => set({ sites }),
  addSite: (site) =>
    set((state) => ({
      sites: [...state.sites, site],
    })),
  selectSiteId: (siteId) =>
    set((state) =>
      state.sites.some((site) => site.siteId === siteId)
        ? { selectedSiteId: siteId }
        : state
    ),
  setSetupLoading: (loading) => set({ setupLoading: loading }),
  setWidgetPosition: (position) => set({ widgetPosition: position }),
}));
