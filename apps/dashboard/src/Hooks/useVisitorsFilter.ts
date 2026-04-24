import { useState } from "react";
import { useVisitorsAnalytics, useVisitorInsights } from "./useAnalytics";

export const useVisitorsFilter = (selectedSiteId: string | null) => {
  const [range, setRange] = useState("30days");
  const { data: traffic, isLoading: trafficLoading } = useVisitorsAnalytics(
    selectedSiteId,
    range,
  );
  const { data: insights, isLoading: insightsLoading } =
    useVisitorInsights(selectedSiteId);
  const totalVisitors =
    (insights?.returningVsNew?.newVisitors ?? 0) +
    (insights?.returningVsNew?.returningVisitors ?? 0);
  const avgDuration = insights?.avgSessionDuration?.avgDuration ?? 0;
  const totalSessions = insights?.avgSessionDuration?.totalSessions ?? 0;
  const returningPct =
    totalVisitors > 0
      ? Math.round(
          ((insights?.returningVsNew?.returningVisitors ?? 0) / totalVisitors) *
            100,
        )
      : 0;

  const totalCountries = (insights?.topCountries ?? []).reduce(
    (s: number, c: any) => s + c.visitors,
    0,
  );
  const totalPages = (insights?.topPages ?? []).reduce(
    (s: number, p: any) => s + p.views,
    0,
  );
  const totalLangs = (insights?.languageBreakdown ?? []).reduce(
    (s: number, l: any) => s + l.count,
    0,
  );
  const deviceData = insights?.screenSizes ?? [];
  const platformData = insights?.deviceBreakdown ?? [];
  return {
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
  };
};
