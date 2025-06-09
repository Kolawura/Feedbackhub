import { useEffect, useState } from "react";

interface TopPage {
  url: string;
  count: number;
}

interface AnalyticsData {
  totalVisitors: number;
  totalPageViews: number;
  topPages: TopPage[];
}

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await fetch(`../Api/api.json`);
        const json = await response.json();

        if (!json.success) {
          throw new Error("Failed to fetch analytics");
        }
        setAnalytics(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!analytics) return null;

  return (
    <div>
      <h1>Site Analytics</h1>

      <div className="summary-cards">
        <div>Total Visitors: {analytics.totalVisitors}</div>
        <div>Total Page Views: {analytics.totalPageViews}</div>
        <div>
          Avg Pages / Visitor:{" "}
          {(analytics.totalPageViews / analytics.totalVisitors).toFixed(2)}
        </div>
      </div>

      <h2>Top Visited Pages</h2>
      <ul>
        {analytics.topPages.map(({ url, count }) => (
          <li key={url}>
            {url} — {count} visits
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalyticsPage;
