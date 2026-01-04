import { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";
import { ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useVisitorStore } from "../../Store/useVisitorStore";
import Loader from "../ui/Loader";
import { EmptyState } from "../ui/EmptyState";
import { useSetupStore } from "../../Store/useSetupStore";
import { useVisitorsAnalytics } from "../../Hooks/useAnalytics";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VisitorAnalytics = () => {
  const [selected, setSelected] = useState("optionOne");
  const timeRanges = [
    { id: "optionOne", label: "30 days", value: "30days" },
    { id: "optionTwo", label: "12 months", value: "12months" },
    { id: "optionThree", label: "4 weeks", value: "4weeks" },
    { id: "optionFour", label: "7 days", value: "7days" },
    { id: "optionFive", label: "24 hours", value: "24hours" },
  ];
  const { selectedSiteId } = useSetupStore();

  const { analytics, loading } = useVisitorStore();
  const currentRange =
    timeRanges.find((range) => range.id === selected)?.value || "30days";

  const { data, isLoading } = useVisitorsAnalytics(
    selectedSiteId,
    currentRange
  );

  const chartData = useMemo(
    () =>
      data ?? {
        labels: [],
        data: [],
        label: "",
      },
    [data]
  );

  const chartJSData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Visitors",
        data: chartData.data,
        backgroundColor: "#3B82F6",
        borderRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 600,
      easing: "easeInOutQuad",
    },
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#9CA3AF", stepSize: 500 },
        grid: { color: "#888888", tickBorderDash: [5, 5], tickColor: "#00f" },
        border: { display: true, color: "#ddd6d6" },
      },
      x: {
        ticks: { color: "#9CA3AF" },
        grid: { display: false },
        border: { display: true, color: "#ddd6d6" },
      },
    },
  };

  const noData = !loading && chartData.data.length === 0;

  return (
    <div className="bg-white dark:bg-white/3 shadow rounded-lg p-4 m-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Analytics
          </h2>
          <p className="text-gray-400 dark:text-gray-300">
            {`Visitors analytics for the past ${chartData.label || "..."}`}
          </p>
        </div>
        <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelected(range.id)}
              className={`
                rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200
                ${
                  selected === range.id
                    ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-white/3"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }
              `}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-[400px] flex items-center justify-center"
        >
          {loading ? (
            <Loader message="Loading visitor analytics..." />
          ) : noData ? (
            <EmptyState
              message="No visitor data available"
              variant="analytics"
            />
          ) : (
            <Bar data={chartJSData} options={options} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default VisitorAnalytics;
