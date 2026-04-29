// src/Pages/VisitorDetailPage.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  MessageSquare,
  RotateCcw,
  MousePointer,
  ArrowUpRight,
} from "lucide-react";
import { useVisitorDetail } from "../Hooks/useVisitors";
import LoadingPage from "./LoadingPage";
import { formatDate, pathOnly } from "../utils/utils";
import { SessionCard } from "../Components/Visitors/SessionCard";
import { parseBrowser } from "../utils/parseBrowser";
import { Tile } from "../Components/Analytics/Title";

// const Tile = ({
//   icon,
//   label,
//   value,
//   colorVar = "var(--amber)",
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string | number;
//   colorVar?: string;
// }) => (
//   <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-4">
//     <div className="flex items-center gap-2 mb-2">
//       <span style={{ color: colorVar }} className="opacity-60">
//         {icon}
//       </span>
//       <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest">
//         {label}
//       </p>
//     </div>
//     <p className="font-display text-2xl font-bold" style={{ color: colorVar }}>
//       {value}
//     </p>
//   </div>
// );

// ── Main component ────────────────────────────────────────────────────────────
export const VisitorDetailPage = () => {
  const { visitorId } = useParams<{ visitorId: string }>();
  const navigate = useNavigate();
  const { data: visitor, isLoading } = useVisitorDetail(visitorId ?? null);

  if (isLoading) return <LoadingPage />;

  if (!visitor)
    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center gap-4 p-6">
        <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest">
          Visitor not found
        </p>
        <button
          onClick={() => navigate("/visitors")}
          className="font-mono text-xs text-[var(--amber)] hover:opacity-70 transition-opacity"
        >
          ← Back to visitors
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-serif p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto space-y-5"
      >
        {/* Back */}
        <button
          onClick={() => navigate("/visitors")}
          className="flex items-center gap-2 font-mono text-xs text-[var(--text-dim)] hover:text-[var(--amber)] transition-colors uppercase tracking-widest"
        >
          <ArrowLeft size={12} /> All visitors
        </button>

        {/* Identity header */}
        <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-5">
          <div className="flex items-start gap-4 flex-wrap justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--amber-bg)] border border-[var(--amber-border)] flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-sm font-bold text-[var(--amber)]">
                  {visitor.visitorId.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-0.5">
                  Visitor ID
                </p>
                <p className="font-mono text-sm text-[var(--text)] break-all">
                  {visitor.visitorId}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-[var(--text-dim)]">
                First seen: {formatDate(visitor.firstSeen)}
              </p>
              <p className="font-mono text-xs text-[var(--text-dim)] mt-0.5">
                Last seen: {formatDate(visitor.lastSeen)}
              </p>
            </div>
          </div>

          {/* Device + location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-[var(--border)]">
            <div>
              <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-1">
                Location
              </p>
              <p className="font-mono text-xs text-[var(--text)]">
                {visitor.city
                  ? `${visitor.city}, ${visitor.country}`
                  : visitor.country || "—"}
              </p>
              {visitor.region && (
                <p className="font-mono text-xs text-[var(--text-dim)]">
                  {visitor.region}
                </p>
              )}
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-1">
                Browser
              </p>
              <p className="font-mono text-xs text-[var(--text)]">
                {parseBrowser(visitor.userInfo?.userAgent)}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-1">
                Language
              </p>
              <p className="font-mono text-xs text-[var(--text)]">
                {visitor.userInfo?.language || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Tile
            icon={<RotateCcw size={14} />}
            label="Sessions"
            value={visitor.totalSessions}
          />
          <Tile
            icon={<MousePointer size={14} />}
            label="Page views"
            value={visitor.totalPageViews}
          />
          <Tile
            icon={<Clock size={14} />}
            label="Avg session"
            value={visitor.avgSessionDurationLabel}
            colorVar="var(--blue)"
          />
          <Tile
            icon={<MessageSquare size={14} />}
            label="Feedback"
            value={visitor.totalFeedback}
            colorVar={
              visitor.totalFeedback > 0 ? "var(--amber)" : "var(--text-dim)"
            }
          />
        </div>

        {/* Top pages */}
        {visitor.topPages.length > 0 && (
          <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-5">
            <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-4">
              Most visited pages
            </p>
            <div className="space-y-2">
              {visitor.topPages.map((p) => {
                const pct = Math.round(
                  (p.visits / visitor.totalPageViews) * 100,
                );
                return (
                  <div key={p.url} className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--text-muted)] truncate w-44 md:w-64 flex-shrink-0">
                      {pathOnly(p.url)}
                    </span>
                    <div className="flex-1 h-1.5 bg-[var(--bg-hover)] overflow-hidden rounded-full">
                      <motion.div
                        className="h-full rounded-full bg-[var(--amber)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                    <span className="font-mono text-xs text-[var(--text-dim)] w-6 text-right flex-shrink-0">
                      {p.visits}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Session history */}
        <div>
          <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-3">
            Session history ({visitor.totalSessions})
          </p>
          <div className="space-y-2">
            {visitor.sessions.map((session, i) => (
              <SessionCard key={session._id} session={session} index={i} />
            ))}
          </div>
        </div>

        {/* Feedback submitted */}
        {visitor.feedback.length > 0 && (
          <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-5">
            <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-4">
              Feedback submitted ({visitor.totalFeedback})
            </p>
            <div className="space-y-1.5">
              {visitor.feedback.map((fb) => (
                <a
                  key={fb._id}
                  href={`/feedback/${fb._id}`}
                  className="flex items-center gap-3 px-3 py-2.5 border border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors group"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      fb.category === "bug"
                        ? "bg-[var(--red)]"
                        : fb.category === "feature"
                          ? "bg-[var(--blue)]"
                          : fb.category === "improvement"
                            ? "bg-[var(--green)]"
                            : "bg-[var(--text-dim)]"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-[var(--text)] truncate group-hover:text-[var(--amber)] transition-colors">
                      {fb.title}
                    </p>
                    {fb.page && (
                      <p className="font-mono text-xs text-[var(--text-dim)] truncate mt-0.5">
                        on {pathOnly(fb.page)}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-xs text-[var(--text-dim)] flex-shrink-0">
                    {new Date(fb.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <ArrowUpRight
                    size={12}
                    className="text-[var(--text-dim)] group-hover:text-[var(--amber)] transition-colors flex-shrink-0"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
