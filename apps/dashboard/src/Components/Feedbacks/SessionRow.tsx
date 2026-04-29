import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { VisitorSession } from "../../Type";
import { parseBrowser } from "../../utils/parseBrowser";
import { formatTime, sessionDuration } from "../../utils/utils";

export function SessionRow({
  session,
  index,
}: {
  session: VisitorSession;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const pathOnly = (url: string) => {
    try {
      return new URL(url).pathname || "/";
    } catch {
      return url;
    }
  };

  return (
    <div className="border border-[var(--border)] bg-[var(--bg)]">
      {/* Session header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-hover)] transition-colors text-left"
      >
        <span className="text-[var(--text-dim)] flex-shrink-0">
          {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest">
              Session {index + 1}
            </span>
            {session.city && (
              <span className="font-mono text-xs text-[var(--text-dim)]">
                · {session.city}
                {session.country ? `, ${session.country}` : ""}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="font-mono text-xs text-[var(--text-muted)]">
              {formatTime(session.visitTimestamp)}
            </span>
            <span className="font-mono text-xs text-[var(--text-dim)]">
              {session.pagesVisited?.length ?? 0} pages ·{" "}
              {sessionDuration(session)}
            </span>
          </div>
        </div>
        <span className="font-mono text-xs text-[var(--text-dim)] truncate max-w-[140px] hidden sm:block">
          {parseBrowser(session.userInfo?.userAgent)}
        </span>
      </button>

      {/* Expanded: page journey */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--border)] px-4 py-3 space-y-1.5">
              {session.pagesVisited?.map((pv, i) => (
                <div key={pv._id ?? i} className="flex items-start gap-3 group">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center flex-shrink-0 mt-1">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        i === 0
                          ? "bg-[var(--green)]"
                          : i === session.pagesVisited.length - 1
                            ? "bg-[var(--amber)]"
                            : "bg-[var(--text-dim)]"
                      }`}
                    />
                    {i < session.pagesVisited.length - 1 && (
                      <div className="w-px flex-1 min-h-[12px] bg-[var(--border)] mt-0.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pb-1.5">
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-xs text-[var(--text)] truncate">
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
                    <p className="font-mono text-xs text-[var(--text-dim)] mt-0.5">
                      {formatTime(pv.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
