import { useMemo } from "react";
import { Feedback } from "../Type";

export const useFeedbackAnalytics = (
  feedbacks: Feedback[],
  analytics: any,
  visitorData: any,
  c: any,
) => {
  const categoryCount = useMemo(() => {
    const m: Record<string, number> = {
      bug: 0,
      feature: 0,
      improvement: 0,
      other: 0,
    };
    feedbacks?.forEach((f) => {
      m[f.category] = (m[f.category] ?? 0) + 1;
    });
    return m;
  }, [feedbacks]);

  const priorityCount = useMemo(() => {
    const m: Record<string, number> = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    };
    feedbacks?.forEach((f) => {
      m[f.priority] = (m[f.priority] ?? 0) + 1;
    });
    return m;
  }, [feedbacks]);

  const topLocations = useMemo(() => {
    const m: Record<string, number> = {};
    feedbacks?.forEach((f) => {
      const loc = f.userInfo?.location;
      if (loc) m[loc] = (m[loc] ?? 0) + 1;
    });
    return Object.entries(m)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [feedbacks]);

  const topBrowsers = useMemo(() => {
    const m: Record<string, number> = {};
    feedbacks?.forEach((f) => {
      const ua = f.userInfo?.browser ?? "";
      let name = "Other";
      if (ua.includes("Chrome") && !ua.includes("Edg")) name = "Chrome";
      else if (ua.includes("Firefox")) name = "Firefox";
      else if (ua.includes("Safari") && !ua.includes("Chrome")) name = "Safari";
      else if (ua.includes("Edg")) name = "Edge";
      m[name] = (m[name] ?? 0) + 1;
    });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [feedbacks]);

  const chartData = useMemo(() => {
    return {
      trendData: {
        labels: analytics?.labels ?? [],
        datasets: [
          {
            label: "Feedback",
            data: analytics?.trend ?? [],
            borderColor: c.amber,
            backgroundColor: c.amberAlpha,
            tension: 0.4,
            borderWidth: 1.5,
            pointRadius: 3,
            pointBackgroundColor: c.amber,
            fill: true,
          },
        ],
      },

      visitorChartData: {
        labels: visitorData?.labels ?? [],
        datasets: [
          {
            label: "Visitors",
            data: visitorData?.data ?? [],
            backgroundColor: `${c.blue}80`,
            borderColor: c.blue,
            borderWidth: 1,
            borderRadius: 2,
          },
        ],
      },

      categoryChartData: {
        labels: ["Bug", "Feature", "Improvement", "Other"],
        datasets: [
          {
            data: [
              categoryCount.bug,
              categoryCount.feature,
              categoryCount.improvement,
              categoryCount.other,
            ],
            backgroundColor: [c.red, c.blue, c.green, c.muted],
            borderWidth: 0,
            hoverOffset: 8,
          },
        ],
      },

      priorityChartData: {
        labels: ["Critical", "High", "Medium", "Low"],
        datasets: [
          {
            data: [
              priorityCount.critical,
              priorityCount.high,
              priorityCount.medium,
              priorityCount.low,
            ],
            backgroundColor: [c.red, "#e07852", c.amber, c.green],
            borderWidth: 0,
            hoverOffset: 8,
          },
        ],
      },

      browserChartData: {
        labels: topBrowsers.map(([b]) => b),
        datasets: [
          {
            label: "Users",
            data: topBrowsers.map(([, n]) => n),
            backgroundColor: [c.amber, c.blue, c.green, c.muted, c.red].slice(
              0,
              topBrowsers.length,
            ),
            borderWidth: 0,
            borderRadius: 2,
          },
        ],
      },
    };
  }, [analytics, visitorData, categoryCount, priorityCount, topBrowsers, c]);

  return { categoryCount, topLocations, topBrowsers, chartData };
};
