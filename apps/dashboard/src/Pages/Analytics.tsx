import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { useSiteStore } from "../Store/useSiteStore";
import { useSites } from "../Hooks/useSite";
import { useFeedbacks } from "../Hooks/useFeedback";
import {
  useDashboardAnalytics,
  useVisitorsAnalytics,
  useVisitorInsights,
} from "../Hooks/useAnalytics";
import { Feedback } from "../Type";
import { useThemeStore } from "../Store/useThemeStore";
import {
  Users,
  TrendingUp,
  Clock,
  RotateCcw,
  MousePointer,
} from "lucide-react";
import { chartOptions } from "../Components/Charts/chartOptions";
import { FeedbackTab } from "../Components/Analytics/FeedbackTab";
import { VisitorsTab } from "../Components/Analytics/VisitorsTab";
import { useChartColors } from "../Components/ui/styles";
import { fadeUp } from "../utils/fadeUp";

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
);

// ─── Main Analytics page ──────────────────────────────────────────────────────
export function Analytics() {
  const [activeTab, setActiveTab] = useState<"visitors" | "feedback">(
    "visitors",
  );
  const { selectedSiteId, selectSiteId } = useSiteStore();
  const { data: sites } = useSites().sitesQuery;
  const { data: feedbacks } = useFeedbacks(selectedSiteId ?? undefined);
  const { data: analytics, isLoading: analyticsLoading } =
    useDashboardAnalytics(selectedSiteId);
  const c = useChartColors();
  const { lineOptions, barOptions, doughnutOptions } = chartOptions(c);

  const tabs = [
    { id: "visitors" as const, label: "Visitors", icon: <Users size={13} /> },
    {
      id: "feedback" as const,
      label: "Feedback",
      icon: <TrendingUp size={13} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-serif p-4 md:p-6 space-y-5 md:space-y-6">
      {/* Header + site selector */}
      <motion.div
        {...fadeUp(0)}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <p className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase mb-1">
            Overview
          </p>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[var(--text)]">
            Analytics
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest">
            Site
          </span>
          <select
            value={selectedSiteId ?? "all"}
            onChange={(e) =>
              selectSiteId(e.target.value === "all" ? null : e.target.value)
            }
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

      {/* Tabs */}
      <motion.div {...fadeUp(0.05)}>
        <div className="flex border-b border-[var(--border)]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-mono text-xs uppercase tracking-widest border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-[var(--amber)] text-[var(--amber)]"
                  : "border-transparent text-[var(--text-dim)] hover:text-[var(--text-muted)]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "feedback" ? (
            <FeedbackTab
              feedbacks={feedbacks}
              analytics={analytics}
              analyticsLoading={analyticsLoading}
              c={c}
              doughnutOptions={doughnutOptions}
              lineOptions={lineOptions}
            />
          ) : (
            <VisitorsTab
              selectedSiteId={selectedSiteId}
              c={c}
              barOptions={barOptions}
              doughnutOptions={doughnutOptions}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
