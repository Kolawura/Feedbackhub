import { create } from "zustand";
import { fetch } from "../lib/axios";
import { toast } from "react-hot-toast";
import { persist } from "zustand/middleware";

interface Site {
  siteId: string;
  name: string;
  createdAt: string;
}

interface SetupState {
  sites: Site[];
  setupLoading: boolean;
  setSites: (sites: Site[]) => void;
  setSetupLoading: (loading: boolean) => void;
  widgetPosition: string;
  setWidgetPosition: (position: string) => void;
  addSite: (name: string) => Promise<Site | null>;
}

export const useSetupStore = create<SetupState>()(
  persist(
    (set) => ({
      sites: [],
      setupLoading: false,

      setSites: (sites) => set({ sites }),

      setSetupLoading: (loading) => set({ setupLoading: loading }),
      widgetPosition: "bottom-right",
      setWidgetPosition: (position) => set({ widgetPosition: position }),

      addSite: async (name) => {
        try {
          set({ setupLoading: true });

          const response = await fetch.post(
            "/api/sites/add",
            { name },
            { withCredentials: true }
          );

          const { success, newSite } = response.data;

          if (success) {
            set((state) => ({
              sites: [...state.sites, newSite],
            }));
            toast.success("Site added successfully");
            return newSite;
          } else {
            toast.error("Failed to add site");
            return null;
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Something went wrong");
          return null;
        } finally {
          set({ setupLoading: false });
        }
      },
    }),
    {
      name: "setup-storage",
      partialize: (state) => ({
        widgetPosition: state.widgetPosition,
      }),
    }
  )
);
