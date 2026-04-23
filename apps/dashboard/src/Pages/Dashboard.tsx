import { motion } from "framer-motion";
import {
  ArrowUpRight,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Globe,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useFeedbacks } from "../Hooks/useFeedback";
import { useSites } from "../Hooks/useSite";
import { useDashboardAnalytics } from "../Hooks/useAnalytics";
import { useSiteStore } from "../Store/useSiteStore";
import { Feedback } from "../Type";
import {
  categoryDot,
  categoryStyle,
  priorityStyle,
} from "../Components/ui/styles";
import { fadeUp } from "../utils/fadeUp";
import RecentFeedback from "../Components/Feedbacks/RecentFeedbacks";
import NoFeedbacks from "../Components/Feedbacks/NoFeedbacks";
import StatCard from "../Components/Dashboard/StartCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: feedbacks, isLoading } = useFeedbacks();
  const { sitesQuery } = useSites();
  const { selectedSiteId } = useSiteStore();
  const { data: analytics } = useDashboardAnalytics(selectedSiteId);

  const stats = [
    {
      label: "Total feedback",
      value: feedbacks?.length ?? 0,
      icon: <MessageSquare size={14} />,
      color: "var(--amber)",
    },
    {
      label: "Positive signals",
      value: analytics?.positive ?? 0,
      icon: <ThumbsUp size={14} />,
      color: "var(--green)",
    },
    {
      label: "Issues flagged",
      value: analytics?.negative ?? 0,
      icon: <ThumbsDown size={14} />,
      color: "var(--red)",
    },
    {
      label: "Sites tracked",
      value: sitesQuery?.data?.length ?? 0,
      icon: <Globe size={14} />,
      color: "var(--blue)",
    },
  ];

  const recent = feedbacks?.slice(0, 6) ?? [];

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Header */}
      <motion.div {...fadeUp(0)}>
        <p className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase mb-1">
          Dashboard
        </p>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-[var(--text)]">
          Good to see you,{" "}
          <span className="text-[var(--amber)]">{user?.firstName}.</span>
        </h1>
      </motion.div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <StatCard s={s} i={i} isLoading={isLoading} />
        ))}
      </div>

      {/* Recent feedback */}
      <motion.div {...fadeUp(0.25)}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-0.5">
              Recent activity
            </p>
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">
              Latest feedback
            </h2>
          </div>
          <button
            onClick={() => navigate("/feedbacks")}
            className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--amber)] transition-colors group"
          >
            View all
            <ArrowRight
              size={12}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>

        <div className="border border-[var(--border)] bg-[var(--bg-surface)] divide-y divide-[var(--border)]">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 flex items-center gap-4">
                <div className="w-24 h-3 bg-[var(--bg-hover)] animate-pulse rounded-sm" />
                <div className="flex-1 h-3 bg-[var(--bg-hover)] animate-pulse rounded-sm" />
                <div className="w-16 h-3 bg-[var(--bg-hover)] animate-pulse rounded-sm" />
              </div>
            ))
          ) : recent.length === 0 ? (
            <NoFeedbacks />
          ) : (
            recent.map((fb: Feedback) => (
              <RecentFeedback key={fb._id} {...fb} />
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
