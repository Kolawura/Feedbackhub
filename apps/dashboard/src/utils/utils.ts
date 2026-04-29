import { VisitorSession } from "../Type";

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDuration(s: number): string {
  if (!s || s <= 0) return "—";
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return m === 0 ? `${sec}s` : `${m}m ${sec}s`;
}

export function formatTime(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function sessionDuration(session: VisitorSession): string {
  const pages = session.pagesVisited;
  if (!pages || pages.length < 2) return "< 1 min";
  const first = new Date(pages[0].timestamp).getTime();
  const last = new Date(pages[pages.length - 1].timestamp).getTime();
  const secs = Math.round((last - first) / 1000);
  if (secs < 60) return `${secs}s`;
  return `${Math.round(secs / 60)}m ${secs % 60}s`;
}
