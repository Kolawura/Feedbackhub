// src/Pages/VisitorsPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Globe,
  Monitor,
  ArrowUpRight,
} from "lucide-react";
import { useAllVisitors } from "../Hooks/useVisitors";
import { useSiteStore } from "../Store/useSiteStore";
import { useSites } from "../Hooks/useSite";
import { parseBrowser, parsePlatform } from "../utils/parseBrowser";
import { timeAgo } from "../utils/utils";

export const VisitorsPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { selectedSiteId, selectSiteId } = useSiteStore();
  const { data: sites } = useSites().sitesQuery;
  const { data, isLoading } = useAllVisitors(selectedSiteId, page, 20);

  const visitors = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-serif p-4 md:p-6 space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <p className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase mb-1">
            Audience
          </p>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[var(--text)]">
            Visitors
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest">
            Site
          </span>
          <select
            value={selectedSiteId ?? "all"}
            onChange={(e) => {
              selectSiteId(e.target.value === "all" ? null : e.target.value);
              setPage(1);
            }}
            className="bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text)] font-mono text-xs px-3 py-2 focus:outline-none focus:border-[var(--amber)] transition-colors"
          >
            <option value="all">All sites</option>
            {sites?.map((s) => (
              <option key={s.siteId} value={s.siteId}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Stats summary */}
      {pagination && (
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[var(--text-dim)]">
            {pagination.total} unique visitor{pagination.total !== 1 ? "s" : ""}
          </span>
          <span className="font-mono text-xs text-[var(--text-dim)]">·</span>
          <span className="font-mono text-xs text-[var(--text-dim)]">
            Page {pagination.page} of {pagination.totalPages}
          </span>
        </div>
      )}

      {/* Table */}
      <div className="border border-[var(--border)] bg-[var(--bg-surface)]">
        {/* Header row */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_40px] gap-4 px-5 py-3 border-b border-[var(--border)]">
          {[
            "Visitor",
            "Location",
            "Browser",
            "Sessions",
            "Pages",
            "Feedback",
            "",
          ].map((h) => (
            <p
              key={h}
              className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest"
            >
              {h}
            </p>
          ))}
        </div>

        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="px-5 py-4 flex items-center gap-4 border-b border-[var(--border)] last:border-0"
            >
              <div className="w-8 h-8 bg-[var(--bg-hover)] animate-pulse rounded-sm flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="w-32 h-2.5 bg-[var(--bg-hover)] animate-pulse" />
                <div className="w-20 h-2 bg-[var(--bg-hover)] animate-pulse" />
              </div>
            </div>
          ))
        ) : visitors.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest">
              No visitors yet
            </p>
            <p className="text-sm text-[var(--text-dim)] mt-2">
              Install the widget to start tracking
            </p>
          </div>
        ) : (
          visitors.map((v, i) => (
            <motion.div
              key={v.visitorId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => navigate(`/visitors/${v.visitorId}`)}
              className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_40px] gap-2 md:gap-4 px-5 py-4 border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-hover)] cursor-pointer transition-colors group"
            >
              {/* Visitor ID + first/last seen */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 bg-[var(--amber-bg)] border border-[var(--amber-border)] flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-xs font-bold text-[var(--amber)]">
                    {v.visitorId.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-xs text-[var(--text)] truncate group-hover:text-[var(--amber)] transition-colors">
                    {v.visitorId.slice(0, 16)}…
                  </p>
                  <p className="font-mono text-xs text-[var(--text-dim)] mt-0.5">
                    Last seen {timeAgo(v.lastSeen)}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5">
                <Globe
                  size={11}
                  className="text-[var(--text-dim)] flex-shrink-0"
                />
                <span className="font-mono text-xs text-[var(--text-muted)] truncate">
                  {v.city ? `${v.city}, ${v.country}` : v.country || "—"}
                </span>
              </div>

              {/* Browser */}
              <div className="flex items-center gap-1.5">
                <Monitor
                  size={11}
                  className="text-[var(--text-dim)] flex-shrink-0"
                />
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {parseBrowser(v.userAgent)} · {parsePlatform(v.platform)}
                </span>
              </div>

              {/* Sessions */}
              <p className="font-mono text-xs text-[var(--text-muted)] flex items-center">
                {v.sessionCount}
              </p>

              {/* Page views */}
              <p className="font-mono text-xs text-[var(--text-muted)] flex items-center">
                {v.totalPageViews}
              </p>

              {/* Feedback count */}
              <div className="flex items-center gap-1.5">
                {v.feedbackCount > 0 && (
                  <>
                    <MessageSquare size={11} className="text-[var(--amber)]" />
                    <span className="font-mono text-xs text-[var(--amber)]">
                      {v.feedbackCount}
                    </span>
                  </>
                )}
                {v.feedbackCount === 0 && (
                  <span className="font-mono text-xs text-[var(--text-dim)]">
                    —
                  </span>
                )}
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-end">
                <ArrowUpRight
                  size={13}
                  className="text-[var(--text-dim)] group-hover:text-[var(--amber)] transition-colors"
                />
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1.5 px-4 py-2 font-mono text-xs border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--amber)] hover:text-[var(--amber)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={13} /> Prev
          </button>
          <span className="font-mono text-xs text-[var(--text-dim)]">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1.5 px-4 py-2 font-mono text-xs border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--amber)] hover:text-[var(--amber)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next <ChevronRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
};
