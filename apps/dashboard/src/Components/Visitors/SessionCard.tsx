import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Timer,
  MousePointer,
  Globe,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { SessionDetail } from "../../Type";
import { parseBrowser } from "../../utils/parseBrowser";
import { formatDate, pathOnly } from "../../utils/utils";

export const SessionCard = ({ session, index }: { session: SessionDetail; index: number }) => {
  const [open, setOpen] = useState(index === 0); // first session open by default

  return (
    <div className="border border-[var(--border)] bg-[var(--bg)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[var(--bg-hover)] transition-colors text-left"
      >
        <span className="text-[var(--text-dim)] flex-shrink-0">
          {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-xs text-[var(--text)] font-medium">
              Session {index + 1}
            </span>
            <span className="font-mono text-xs text-[var(--text-dim)]">
              {formatDate(session.visitTimestamp)}
            </span>
            {session.feedbackSubmittedCount > 0 && (
              <span className="flex items-center gap-1 font-mono text-xs text-[var(--amber)]">
                <MessageSquare size={10} />
                {session.feedbackSubmittedCount} feedback
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 mt-1 flex-wrap">
            <span className="flex items-center gap-1 font-mono text-xs text-[var(--text-dim)]">
              <Timer size={10} />
              {session.sessionDurationLabel}
            </span>
            <span className="flex items-center gap-1 font-mono text-xs text-[var(--text-dim)]">
              <MousePointer size={10} />
              {session.totalPages} pages
            </span>
            {session.city && (
              <span className="flex items-center gap-1 font-mono text-xs text-[var(--text-dim)]">
                <Globe size={10} />
                {session.city}, {session.country}
              </span>
            )}
          </div>
        </div>

        <span className="font-mono text-xs text-[var(--text-dim)] hidden sm:block flex-shrink-0">
          {parseBrowser(session.userInfo?.userAgent)}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--border)] px-4 py-4">
              {/* Page journey */}
              <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-3">
                Page journey
              </p>
              <div className="space-y-0">
                {session.pagesVisited.map((pv, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    {/* Timeline */}
                    <div className="flex flex-col items-center flex-shrink-0 mt-1.5">
                      <div
                        className={`w-2 h-2 rounded-full border-2 ${
                          pv.isEntryPage
                            ? "border-[var(--green)] bg-[var(--green)]"
                            : pv.isExitPage
                              ? "border-[var(--amber)] bg-transparent"
                              : "border-[var(--text-dim)] bg-transparent"
                        }`}
                      />
                      {i < session.pagesVisited.length - 1 && (
                        <div className="w-px h-6 bg-[var(--border)] mt-0.5" />
                      )}
                    </div>

                    {/* Page info */}
                    <div className="flex-1 min-w-0 pb-3">
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-xs text-[var(--text)] truncate flex-1">
                          {pathOnly(pv.url)}
                        </p>
                        <a
                          href={pv.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[var(--text-dim)] hover:text-[var(--amber)] opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                        >
                          <ExternalLink size={10} />
                        </a>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="font-mono text-xs text-[var(--text-dim)]">
                          {new Date(pv.timestamp).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </span>
                        {/* Time spent on this page */}
                        <span
                          className={`font-mono text-xs ${
                            pv.isExitPage
                              ? "text-[var(--text-dim)] italic"
                              : pv.durationSeconds && pv.durationSeconds > 60
                                ? "text-[var(--green)]"
                                : "text-[var(--text-dim)]"
                          }`}
                        >
                          {pv.isExitPage ? "exit page" : pv.durationLabel}
                        </span>
                        {pv.isEntryPage && (
                          <span className="font-mono text-xs text-[var(--green)] bg-[var(--green-bg)] px-1.5 py-0.5 border border-[var(--green)]/30">
                            entry
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
