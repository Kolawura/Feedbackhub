import { TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Feedback } from "../../Type";
import { useChartColors } from "../ui/styles";
import { ChartCard } from "./ChartCard";
import { Empty } from "./Empty";
import { HBar } from "./HorizontalBar";
import { Skeleton } from "./Skeleton";
import { Tile } from "./Title";
import { useFeedbackAnalytics } from "../../Hooks/useFeedbackAnalytics";

export function FeedbackTab({
  feedbacks,
  analytics,
  analyticsLoading,
  c,
  doughnutOptions,
  lineOptions,
}: {
  feedbacks: Feedback[] | undefined;
  analytics: any;
  analyticsLoading: boolean;
  c: ReturnType<typeof useChartColors>;
  doughnutOptions: any;
  lineOptions: any;
}) {
  const {
    categoryCount,
    priorityCount,
    topLocations,
    trendData,
    catData,
    priData,
    total,
  } = useFeedbackAnalytics(feedbacks, analytics, null, c);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Tile
          label="Total feedback"
          value={feedbacks?.length ?? 0}
          icon={<TrendingUp size={14} />}
        />
        <Tile
          label="Positive signals"
          value={analytics?.positive ?? 0}
          colorVar="var(--green)"
          icon={<TrendingUp size={14} />}
        />
        <Tile
          label="Issues flagged"
          value={analytics?.negative ?? 0}
          colorVar="var(--red)"
          icon={<TrendingUp size={14} />}
        />
        <Tile
          label="Bugs reported"
          value={categoryCount.bug}
          colorVar="var(--red)"
          sub="of total"
          icon={<TrendingUp size={14} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Feedback trend"
          sub="Submissions over the last 5 months"
        >
          <div className="h-[200px] md:h-[220px]">
            {analyticsLoading ? (
              <Skeleton />
            ) : !analytics?.trend?.length ? (
              <Empty />
            ) : (
              <Line data={trendData} options={lineOptions} />
            )}
          </div>
        </ChartCard>
        <ChartCard title="By category" sub="Distribution across feedback types">
          <div className="h-[200px] md:h-[220px]">
            {!feedbacks?.length ? (
              <Empty />
            ) : (
              <Doughnut data={catData} options={doughnutOptions} />
            )}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="By priority" sub="How urgent is the feedback?">
          <div className="h-[200px] md:h-[220px]">
            {!feedbacks?.length ? (
              <Empty />
            ) : (
              <Doughnut data={priData} options={doughnutOptions} />
            )}
          </div>
        </ChartCard>
        {topLocations.length > 0 && (
          <ChartCard title="Top locations" sub="Where feedback is coming from">
            {topLocations.map(([loc, count]) => (
              <HBar key={loc} label={loc} count={count} total={total} />
            ))}
          </ChartCard>
        )}
      </div>

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
            {feedbacks.slice(0, 6).map((fb: Feedback) => (
              <div
                key={fb._id}
                className="flex items-center gap-3 px-4 md:px-5 py-3 hover:bg-[var(--bg-hover)] transition-colors"
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
                <p className="flex-1 font-mono text-xs text-[var(--text)] truncate">
                  {fb.title}
                </p>
                <p className="font-mono text-xs text-[var(--text-dim)] hidden md:block truncate w-24">
                  {fb.name || "Anonymous"}
                </p>
                {fb.userInfo?.location && (
                  <p className="font-mono text-xs text-[var(--text-dim)] hidden lg:block truncate w-28">
                    {fb.userInfo.location}
                  </p>
                )}
                <p className="font-mono text-xs text-[var(--text-dim)] flex-shrink-0">
                  {new Date(fb.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
