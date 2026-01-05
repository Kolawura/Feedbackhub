import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { EmptyState } from "../ui/EmptyState";
import Loader from "../ui/Loader";
import { useSiteStore } from "../../Store/useSiteStore";
import { useDashboardAnalytics } from "../../Hooks/useAnalytics";

ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export const DashboardAnalytics = () => {
  const { selectedSiteId } = useSiteStore();
  const { data: analytics, isLoading: loading } =
    useDashboardAnalytics(selectedSiteId);

  const hasTrendData =
    Array.isArray(analytics?.trend) && analytics.trend.length > 0;
  const hasDoughnutData =
    (analytics?.positive ?? 0) > 0 || (analytics?.negative ?? 0) > 0;

  const lineData = {
    labels: analytics?.labels || [],
    datasets: [
      {
        label: "Feedback",
        data: analytics?.trend || [],
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
        data: [analytics?.positive || 0, analytics?.negative || 0],
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-white/3 rounded-xl p-4 shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Feedback Trend
          </h2>
          <div className="h-[250px]">
            {loading ? (
              <Loader />
            ) : hasTrendData ? (
              <Chart
                id={`chart-line-${selectedSiteId}`}
                type="line"
                data={lineData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            ) : (
              <EmptyState
                message="No feedback trend data available"
                variant="analytics"
              />
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-white/3 rounded-xl p-4 shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Feedback Type
          </h2>
          <div className="h-[250px]">
            {loading ? (
              <Loader />
            ) : hasDoughnutData ? (
              <Chart
                id={`chart-doughnut-${selectedSiteId}`}
                type="doughnut"
                data={doughnutData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            ) : (
              <EmptyState
                message="No feedback type data available"
                variant="analytics"
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
