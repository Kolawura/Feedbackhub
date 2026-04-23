import { useNavigate } from "react-router-dom";
import { Feedback } from "../../Type";
import { ArrowUpRight } from "lucide-react";
import { categoryDot, categoryStyle, priorityStyle } from "../ui/styles";

const RecentFeedback = (fb: Feedback) => {
  const navigate = useNavigate();
  return (
    <div
      key={fb._id}
      onClick={() => navigate(`/feedback/${fb._id}`)}
      className="p-3 md:p-4 flex items-start gap-3 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer group"
    >
      <div
        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${categoryDot[fb.category] ?? "bg-[var(--text-dim)]"}`}
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-mono text-sm text-[var(--text)] truncate group-hover:text-[var(--amber)] transition-colors">
          {fb.title}
        </h3>
        <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
          {fb.description}
        </p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span
          className={`hidden sm:inline font-mono text-xs px-2 py-0.5 border ${categoryStyle[fb.category] ?? categoryStyle.other}`}
        >
          {fb.category}
        </span>
        <span
          className={`font-mono text-xs px-2 py-0.5 border ${priorityStyle[fb.priority] ?? priorityStyle.low}`}
        >
          {fb.priority}
        </span>
        <span className="hidden md:block text-xs font-mono text-[var(--text-dim)]">
          {new Date(fb.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
        <ArrowUpRight
          size={12}
          className="text-[var(--text-dim)] group-hover:text-[var(--amber)] transition-colors"
        />
      </div>
    </div>
  );
};

export default RecentFeedback;
