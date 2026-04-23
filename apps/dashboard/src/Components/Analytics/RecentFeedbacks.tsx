import { Feedback } from "../../Type";

export const RecentFeedbacks = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div
      key={feedback._id}
      className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 hover:bg-[var(--bg-hover)] transition-colors"
    >
      <div
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          feedback.category === "bug"
            ? "bg-[var(--red)]"
            : feedback.category === "feature"
              ? "bg-[var(--blue)]"
              : feedback.category === "improvement"
                ? "bg-[var(--green)]"
                : "bg-[var(--text-dim)]"
        }`}
      />
      <p className="flex-1 font-mono text-xs text-[var(--text)] truncate">
        {feedback.title}
      </p>
      <p className="font-mono text-xs text-[var(--text-dim)] hidden md:block truncate w-24">
        {feedback.name || "Anonymous"}
      </p>
      {feedback.userInfo?.location && (
        <p className="font-mono text-xs text-[var(--text-dim)] hidden lg:block truncate w-28">
          {feedback.userInfo.location}
        </p>
      )}
      <p className="font-mono text-xs text-[var(--text-dim)] flex-shrink-0">
        {new Date(feedback.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </p>
    </div>
  );
};
