import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  isSystemDefault: boolean;
  toggleTheme: () => void;
  setSystemTheme: (theme: Theme) => void;
  setTheme: (theme: Theme) => void; // Only for internal use, not exposed to components
  resetToSystem: () => void;
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getSystemTheme(),
      isSystemDefault: true,
      toggleTheme: () =>
        set((s) => ({
          theme: s.theme === "dark" ? "light" : "dark",
          isSystemDefault: false,
        })),

      setSystemTheme: (theme) => set({ theme }), // user sets a specific system theme
      setTheme: (theme) => set({ theme, isSystemDefault: false }),

      resetToSystem: () =>
        set({ theme: getSystemTheme(), isSystemDefault: true }),
    }),
    {
      name: "fh-theme",
      // Only persist if the user has made an explicit choice.
      // If they haven't, don't save, let getSystemTheme() run fresh next visit.
      partialize: (state) =>
        state.isSystemDefault
          ? {}
          : { theme: state.theme, isSystemDefault: false },
    },
  ),
);
