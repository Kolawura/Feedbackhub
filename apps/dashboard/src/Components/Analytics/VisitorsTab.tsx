import { AnimatePresence, motion } from "framer-motion";
import { Users, RotateCcw, Clock, MousePointer } from "lucide-react";
import { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  useVisitorsAnalytics,
  useVisitorInsights,
} from "../../Hooks/useAnalytics";
import { formatDuration } from "../../utils/utils";
import { useChartColors } from "../ui/styles";
import { ChartCard } from "./ChartCard";
import { Empty } from "./Empty";
import { HBar } from "./HorizontalBar";
import { Skeleton } from "./Skeleton";
import { Tile } from "./Title";
import { useVisitorsFilter } from "../../Hooks/useVisitorsFilter";
import { chartOptions } from "../Charts/chartOptions";
import { visitorsChatOptions } from "../Charts/visitorsChatOptions";

const timeRanges = [
  { id: "24hours", label: "24h" },
  { id: "7days", label: "7d" },
  { id: "30days", label: "30d" },
  { id: "4weeks", label: "4w" },
  { id: "12months", label: "12m" },
];

export function VisitorsTab({
  selectedSiteId,
  c,
  barOptions,
  doughnutOptions,
}: {
  selectedSiteId: string | null;
  c: ReturnType<typeof useChartColors>;
  barOptions: any;
  doughnutOptions: any;
}) {
  const {
    totalVisitors,
    avgDuration,
    totalSessions,
    returningPct,
    totalCountries,
    totalPages,
    totalLangs,
    deviceData,
    platformData,
    traffic,
    trafficLoading,
    insights,
    insightsLoading,
    range,
    setRange,
  } = useVisitorsFilter(selectedSiteId);

  const { trafficChart, deviceChart, platformChart } = visitorsChatOptions(
    c,
    traffic,
    deviceData,
    platformData,
  );

  return (
    <div className="space-y-4">
      {/* Stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Tile
          label="Total visitors"
          value={totalVisitors}
          colorVar="var(--amber)"
          icon={<Users size={14} />}
        />
        <Tile
          label="Returning"
          value={`${returningPct}%`}
          colorVar="var(--green)"
          sub={`${insights?.returningVsNew?.returningVisitors ?? 0} visitors`}
          icon={<RotateCcw size={14} />}
        />
        <Tile
          label="Avg session"
          value={formatDuration(avgDuration)}
          colorVar="var(--blue)"
          sub={`${totalSessions} sessions`}
          icon={<Clock size={14} />}
        />
        <Tile
          label="Total sessions"
          value={totalSessions}
          colorVar="var(--amber)"
          icon={<MousePointer size={14} />}
        />
      </div>

      {/* Traffic chart */}
      <ChartCard
        title="Visitor traffic"
        sub="Sessions over the selected period"
      >
        <div className="flex items-center gap-1 mb-4 flex-wrap">
          {timeRanges.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id)}
              className={`font-mono text-xs px-3 py-1.5 transition-colors border ${
                range === r.id
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
            key={range}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-[220px] md:h-[260px]"
          >
            {trafficLoading ? (
              <Skeleton />
            ) : !traffic?.data?.length ? (
              <Empty msg="No visitor data yet — install the widget to start tracking" />
            ) : (
              <Bar data={trafficChart} options={barOptions} />
            )}
          </motion.div>
        </AnimatePresence>
      </ChartCard>

      {/* Device + Platform */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Device type" sub="Mobile, tablet, or desktop">
          <div className="h-[200px] md:h-[220px]">
            {insightsLoading ? (
              <Skeleton bars={3} />
            ) : !deviceData.length ? (
              <Empty msg="No device data yet" />
            ) : (
              <Doughnut data={deviceChart} options={doughnutOptions} />
            )}
          </div>
        </ChartCard>
        <ChartCard title="Platform / OS" sub="Operating system breakdown">
          <div className="h-[200px] md:h-[220px]">
            {insightsLoading ? (
              <Skeleton bars={5} />
            ) : !platformData.length ? (
              <Empty msg="No platform data yet" />
            ) : (
              <Doughnut data={platformChart} options={doughnutOptions} />
            )}
          </div>
        </ChartCard>
      </div>

      {/* New vs returning */}
      <ChartCard
        title="New vs returning visitors"
        sub="How many visitors come back?"
      >
        {insightsLoading ? (
          <div className="h-16">
            <Skeleton bars={2} />
          </div>
        ) : totalVisitors === 0 ? (
          <Empty msg="No visitor data yet" />
        ) : (
          <div className="space-y-1 pt-1">
            <HBar
              label="New visitors"
              count={insights?.returningVsNew?.newVisitors ?? 0}
              total={totalVisitors}
              color="var(--blue)"
            />
            <HBar
              label="Returning visitors"
              count={insights?.returningVsNew?.returningVisitors ?? 0}
              total={totalVisitors}
              color="var(--green)"
            />
          </div>
        )}
      </ChartCard>

      {/* Top pages + countries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Top pages" sub="Most visited URLs">
          {insightsLoading ? (
            <div className="h-32">
              <Skeleton />
            </div>
          ) : !insights?.topPages?.length ? (
            <Empty msg="No page data yet" />
          ) : (
            <div>
              {insights.topPages.map((p: { url: string; views: number }) => {
                let display = p.url;
                try {
                  display = new URL(p.url).pathname || "/";
                } catch {}
                return (
                  <HBar
                    key={p.url}
                    label={display}
                    count={p.views}
                    total={totalPages}
                    color="var(--amber)"
                  />
                );
              })}
            </div>
          )}
        </ChartCard>

        <ChartCard title="Top countries" sub="Where your visitors are from">
          {insightsLoading ? (
            <div className="h-32">
              <Skeleton />
            </div>
          ) : !insights?.topCountries?.length ? (
            <Empty msg="No country data yet" />
          ) : (
            <div>
              {insights.topCountries.map(
                (c: { country: string; visitors: number }) => (
                  <HBar
                    key={c.country}
                    label={c.country}
                    count={c.visitors}
                    total={totalCountries}
                    color="var(--blue)"
                  />
                ),
              )}
            </div>
          )}
        </ChartCard>
      </div>

      {/* Cities + languages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Top cities" sub="City-level breakdown">
          {insightsLoading ? (
            <div className="h-32">
              <Skeleton />
            </div>
          ) : !insights?.topCities?.length ? (
            <Empty msg="No city data yet" />
          ) : (
            <div>
              {insights.topCities.map(
                (c: { city: string; country: string; visitors: number }) => (
                  <HBar
                    key={`${c.city}-${c.country}`}
                    label={`${c.city}, ${c.country}`}
                    count={c.visitors}
                    total={totalCountries}
                    color="var(--green)"
                  />
                ),
              )}
            </div>
          )}
        </ChartCard>

        <ChartCard title="Languages" sub="Browser language settings">
          {insightsLoading ? (
            <div className="h-32">
              <Skeleton />
            </div>
          ) : !insights?.languageBreakdown?.length ? (
            <Empty msg="No language data yet" />
          ) : (
            <div>
              {insights.languageBreakdown.map(
                (l: { language: string; count: number }) => (
                  <HBar
                    key={l.language}
                    label={l.language}
                    count={l.count}
                    total={totalLangs}
                    color={c.muted}
                  />
                ),
              )}
            </div>
          )}
        </ChartCard>
      </div>
    </div>
  );
}
function visitorsChartOptions(c: { amber: string; amberAlpha: string; red: string; green: string; blue: string; muted: string; dim: string; gridLine: string; tooltipBg: string; tooltipText: string; tooltipBorder: string; border: string; }, traffic: any, deviceData: any, platformData: any): { trafficChart: any; deviceChart: any; platformChart: any; } {
    throw new Error("Function not implemented.");
}

