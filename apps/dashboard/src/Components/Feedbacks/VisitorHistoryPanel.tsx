import { MessageSquare, History } from "lucide-react";
import { useVisitorHistory } from "../../Hooks/useFeedback";
import { formatTime } from "../../utils/utils";
import { SessionRow } from "./SessionRow";

export function VisitorHistoryPanel({
  visitorId,
  feedbackId,
}: {
  visitorId: string;
  feedbackId: string;
}) {
  const { data, isLoading } = useVisitorHistory(visitorId);

  return (
    <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest">
          Visitor history
        </p>
        {data && (
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono text-xs text-[var(--text-dim)]">
              <History size={11} />
              {data.totalSessions} session{data.totalSessions !== 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-1 font-mono text-xs text-[var(--text-dim)]">
              <MessageSquare size={11} />
              {data.totalFeedback} feedback
            </span>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-[var(--bg-hover)] animate-pulse" />
          ))}
        </div>
      ) : !data?.sessions?.length ? (
        <p className="font-mono text-xs text-[var(--text-dim)] py-4">
          No session history found for this visitor.
        </p>
      ) : (
        <div className="space-y-2">
          {data.sessions.map((session, i) => (
            <SessionRow key={session._id} session={session} index={i} />
          ))}
        </div>
      )}

      {/* Other feedback from same visitor */}
      {data && data.feedbacks.length > 1 && (
        <div className="mt-5 pt-5 border-t border-[var(--border)]">
          <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-3">
            Other feedback from this visitor
          </p>
          <div className="space-y-1.5">
            {data.feedbacks
              .filter((fb) => fb._id !== feedbackId)
              .map((fb) => (
                <a
                  key={fb._id}
                  href={`/feedback/${fb._id}`}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-[var(--bg-hover)] transition-colors border border-[var(--border)] group"
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
                  <p className="flex-1 font-mono text-xs text-[var(--text)] truncate group-hover:text-[var(--amber)] transition-colors">
                    {fb.title}
                  </p>
                  <span className="font-mono text-xs text-[var(--text-dim)] flex-shrink-0">
                    {formatTime(fb.createdAt)}
                  </span>
                </a>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
