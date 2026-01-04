import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SetupState {
  selectedSiteId: string | null;
  widgetPosition: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  selectSiteId: (siteId: string | null) => void;
  setWidgetPosition: (
    position: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  ) => void;
}

export const useSetupStore = create<SetupState>()(
  persist(
    (set) => ({
      selectedSiteId: null,
      widgetPosition: "bottom-right",

      selectSiteId: (siteId) => set({ selectedSiteId: siteId }),

      setWidgetPosition: (position) =>
        set({
          widgetPosition: position,
        }),
    }),
    {
      name: "feedbackhub-setup",
      partialize: (state) => ({
        selectedSiteId: state.selectedSiteId,
        widgetPosition: state.widgetPosition,
      }),
    }
  )
);
