// store/useThemeStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    }
  )
);
