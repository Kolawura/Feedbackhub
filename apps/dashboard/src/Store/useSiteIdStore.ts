import { create } from "zustand";

interface SiteIdState {
  siteIds: string[];
  selectedSiteId: string | null;
  setSiteIds: (sites: string[]) => void;
  selectSiteId: (siteId: string) => void;
}

export const useSiteIdStore = create<SiteIdState>((set) => ({
  siteIds: [],
  selectedSiteId: null,

  setSiteIds: (sites) =>
    set({
      siteIds: sites,
      selectedSiteId: sites.length > 0 ? sites[sites.length - 1] : null,
    }),

  selectSiteId: (siteId) =>
    set((state) =>
      state.siteIds.includes(siteId) ? { selectedSiteId: siteId } : state
    ),
}));
