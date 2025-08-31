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

  // called when backend returns all sites after creating or fetching
  setSiteIds: (sites) =>
    set({
      siteIds: sites,
      selectedSiteId: sites.length > 0 ? sites[sites.length - 1] : null, // pick last by default
    }),

  // manually switch selected site
  selectSiteId: (siteId) =>
    set(
      (state) =>
        state.siteIds.includes(siteId) ? { selectedSiteId: siteId } : state // ignore if not in list
    ),
}));
