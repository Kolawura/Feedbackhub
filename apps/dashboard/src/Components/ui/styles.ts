import { useThemeStore } from "../../Store/useThemeStore";

export const categoryDot: Record<string, string> = {
  bug: "bg-[var(--red)]",
  feature: "bg-[var(--blue)]",
  improvement: "bg-[var(--green)]",
  other: "bg-[var(--text-dim)]",
};

export const priorityStyle: Record<string, string> = {
  critical: "text-[var(--red)]   bg-[var(--red-bg)]   border-[var(--red)]",
  high: "text-[var(--red)]   bg-[var(--red-bg)]   border-[var(--red)]",
  medium: "text-[var(--amber)] bg-[var(--amber-bg)] border-[var(--amber)]",
  low: "text-[var(--green)] bg-[var(--green-bg)] border-[var(--green)]",
};

export const categoryStyle: Record<string, string> = {
  bug: "text-[var(--red)]   bg-[var(--red-bg)]   border-[var(--red)]",
  feature: "text-[var(--blue)]  bg-[var(--blue-bg)]  border-[var(--blue)]",
  improvement: "text-[var(--green)] bg-[var(--green-bg)] border-[var(--green)]",
  other: "text-[var(--text-muted)] bg-[var(--bg-hover)] border-[var(--border)]",
};

export const selectClass =
  "bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-muted)] font-mono text-xs px-3 py-2 focus:outline-none focus:border-[var(--amber)] transition-colors";

export const inputClass =
  "w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm font-mono px-4 py-2.5 placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--amber)] transition-colors disabled:opacity-40";

export const labelClass =
  "block font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-1.5";

export function useChartColors() {
  const { theme } = useThemeStore();
  const dark = theme === "dark";
  return {
    amber: dark ? "#f5a623" : "#d4880a",
    amberAlpha: dark ? "rgba(245,166,35,0.07)" : "rgba(212,136,10,0.07)",
    red: dark ? "#e05252" : "#c43b3b",
    green: dark ? "#52a86e" : "#3a8a55",
    blue: dark ? "#5281e0" : "#3a65c4",
    muted: dark ? "#7a7870" : "#6b6a63",
    dim: dark ? "#3d3d42" : "#a8a79f",
    gridLine: dark ? "#1e1e21" : "#ebebeb",
    tooltipBg: dark ? "#161618" : "#ffffff",
    tooltipText: dark ? "#e8e6e0" : "#1a1a1b",
    tooltipBorder: dark ? "#2a2a2e" : "#dddbd3",
    border: dark ? "#2a2a2e" : "#dddbd3",
  };
}
