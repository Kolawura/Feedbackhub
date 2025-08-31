import { useEffect } from "react";
import { motion } from "framer-motion";
import { Chart } from "react-chartjs-2";
import { useDashboardAnalyticsStore } from "../../Store/useDashboardAnalyticsStore";
import LoadingPage from "../../Pages/LoadingPage";
import { useSiteIdStore } from "../../Store/useSiteIdStore";
import ErrorPage from "../../Pages/ErrorPage";

export const DashboardAnalytics = () => {
  const { analytics, loading, error, fetchAnalytics } =
    useDashboardAnalyticsStore();
  const { selectedSiteId } = useSiteIdStore();

  useEffect(() => {
    fetchAnalytics(selectedSiteId);
  }, [selectedSiteId, fetchAnalytics]);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage errorMessage={error} />;

  const lineData = {
    labels: analytics?.labels,
    datasets: [
      {
        label: "Feedback",
        data: analytics?.trend,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#3b82f6",
        pointHoverRadius: 7,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        data: [analytics?.positive, analytics?.negative],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
        hoverOffset: 15,
        borderRadius: 10,
        spacing: 5,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-white/3 rounded-xl p-4 shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">Feedback Trend</h2>
          <div className="h-[250px]">
            <Chart
              type="line"
              data={lineData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </motion.div>

        {/* Doughnut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-white/3 rounded-xl p-4 shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">Feedback Type</h2>
          <div className="h-[250px]">
            <Chart
              type="doughnut"
              data={doughnutData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
