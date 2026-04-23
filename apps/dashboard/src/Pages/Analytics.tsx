import { useState } from "react";
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
} from "../Hooks/useAnalytics";
import { Feedback } from "../Type";
import { Empty } from "../Components/Analytics/Empty";
import { RecentFeedbacks } from "../Components/Analytics/RecentFeedbacks";
import { ChartCard } from "../Components/Analytics/ChartCard";
import { Skeleton } from "../Components/Analytics/Skeleton";
import { Tile } from "../Components/Analytics/Title";
import { fadeUp } from "../utils/fadeUp";
import { useChartColors } from "../Components/ui/styles";
import { useFeedbackAnalytics } from "../Hooks/useFeedbackAnalytics";
import { chartOptions } from "../Components/Charts/chartOptions";

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

const timeRanges = [
  { id: "24hours", label: "24h" },
  { id: "7days", label: "7d" },
  { id: "30days", label: "30d" },
  { id: "4weeks", label: "4w" },
  { id: "12months", label: "12m" },
];

// ─── Main component ───────────────────────────────────────────────────────────
export function Analytics() {
  const [visitorRange, setVisitorRange] = useState("30days");
  const { selectedSiteId, selectSiteId } = useSiteStore();
  const { data: sites } = useSites().sitesQuery;
  const { data: feedbacks } = useFeedbacks(selectedSiteId ?? undefined);
  const { data: analytics, isLoading: analyticsLoading } =
    useDashboardAnalytics(selectedSiteId);
  const { data: visitorData, isLoading: visitorLoading } = useVisitorsAnalytics(
    selectedSiteId,
    visitorRange,
  );
  const color = useChartColors();
  const { categoryCount, topLocations, topBrowsers, chartData } =
    useFeedbackAnalytics(feedbacks ?? [], analytics, visitorData, color);
  const {
    visitorChartData,
    trendData,
    categoryChartData,
    priorityChartData,
    browserChartData,
  } = chartData ?? {};
  const { lineOptions, barOptions, doughnutOptions } = chartOptions(color);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-serif p-4 md:p-6 space-y-6 md:space-y-8">
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

      {/* Stat tiles */}
      <motion.div
        {...fadeUp(0.05)}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        <Tile label="Total feedback" value={feedbacks?.length ?? 0} />
        <Tile
          label="Positive signals"
          value={analytics?.positive ?? 0}
          colorVar="var(--green)"
        />
        <Tile
          label="Issues flagged"
          value={analytics?.negative ?? 0}
          colorVar="var(--red)"
        />
        <Tile
          label="Bugs reported"
          value={categoryCount.bug}
          colorVar="var(--red)"
          sub="of total feedback"
        />
      </motion.div>

      {/* Visitor traffic chart */}
      <motion.div {...fadeUp(0.1)}>
        <ChartCard
          title="Visitor traffic"
          sub="Unique sessions over the selected period"
        >
          {/* Time range toggle */}
          <div className="flex items-center gap-1 mb-4 flex-wrap">
            {timeRanges.map((r) => (
              <button
                key={r.id}
                onClick={() => setVisitorRange(r.id)}
                className={`font-mono text-xs px-3 py-1.5 transition-colors border ${
                  visitorRange === r.id
                    ? "border-[var(--amber)] text-[var(--amber)] bg-[var(--amber-bg)]"
                    : "border-[var(--border)] text-[var(--text-dim)] hover:text-[var(--text-muted)] hover:border-[var(--border-light)]"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={visitorRange}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-[220px] md:h-[260px]"
            >
              {visitorLoading ? (
                <Skeleton />
              ) : !visitorData?.data?.length ? (
                <Empty msg="No visitor data at this time" />
              ) : (
                <Bar data={visitorChartData} options={barOptions} />
              )}
            </motion.div>
          </AnimatePresence>
        </ChartCard>
      </motion.div>

      {/* Feedback trend + category */}
      <motion.div
        {...fadeUp(0.15)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <ChartCard
          title="Feedback trend"
          sub="Submissions over the last 5 months"
        >
          <div className="h-[200px] md:h-[220px]">
            {analyticsLoading ? (
              <Skeleton />
            ) : !analytics?.trend?.length ? (
              <Empty msg="No trend data at this time" />
            ) : (
              <Line data={trendData} options={lineOptions} />
            )}
          </div>
        </ChartCard>

        <ChartCard title="By category" sub="Distribution across feedback types">
          <div className="h-[200px] md:h-[220px]">
            {!feedbacks?.length ? (
              <Empty msg="No feedback data at this time" />
            ) : (
              <Doughnut data={categoryChartData} options={doughnutOptions} />
            )}
          </div>
        </ChartCard>
      </motion.div>

      {/* Priority + browser */}
      <motion.div
        {...fadeUp(0.2)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <ChartCard title="By priority" sub="How urgent is the feedback?">
          <div className="h-[200px] md:h-[220px]">
            {!feedbacks?.length ? (
              <Empty msg="No feedback data at this time" />
            ) : (
              <Doughnut data={priorityChartData} options={doughnutOptions} />
            )}
          </div>
        </ChartCard>

        <ChartCard title="By browser" sub="What browsers are your users on?">
          <div className="h-[200px] md:h-[220px]">
            {!topBrowsers.length ? (
              <Empty msg="Submit feedback to see browser data" />
            ) : (
              <Bar data={browserChartData} options={barOptions} />
            )}
          </div>
        </ChartCard>
      </motion.div>

      {/* Top locations */}
      {topLocations.length > 0 && (
        <motion.div {...fadeUp(0.25)}>
          <ChartCard
            title="Top locations"
            sub="Where your feedback is coming from"
          >
            <div className="space-y-3">
              {topLocations.map(([loc, count]) => {
                const pct = Math.round(
                  (count / (feedbacks?.length || 1)) * 100,
                );
                return (
                  <div key={loc} className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--text-muted)] w-28 md:w-36 truncate flex-shrink-0">
                      {loc}
                    </span>
                    <div className="flex-1 h-1 bg-[var(--bg-hover)] overflow-hidden">
                      <div
                        className="h-full bg-[var(--amber)] transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-[var(--text-dim)] w-6 text-right flex-shrink-0">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </ChartCard>
        </motion.div>
      )}

      {/* Recent feedback table */}
      <motion.div {...fadeUp(0.3)}>
        <div className="border border-[var(--border)] bg-[var(--bg-surface)]">
          <div className="px-5 py-4 border-b border-[var(--border)]">
            <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest">
              Recent feedback
            </p>
          </div>
          {!feedbacks?.length ? (
            <div className="py-12 text-center">
              <Empty msg="No feedback yet" />
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {feedbacks.slice(0, 5).map((fb: Feedback) => (
                <RecentFeedbacks key={fb._id} feedback={fb} />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
