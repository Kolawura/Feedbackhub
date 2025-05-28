import React from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Feedback",
      data: [30, 45, 70, 60, 90],
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
      data: [400, 100],
      backgroundColor: ["#22c55e", "#ef4444"],
      borderWidth: 0,
      hoverOffset: 15,
      borderRadius: 10,
      spacing: 5,
    },
  ],
};

export const DashboardAnalytics = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Animated Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-white/3 rounded-xl p-4 shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Feedback Trend
          </h2>
          <div className="h-[250px]">
            <Chart
              type="line"
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                  duration: 2000,
                  easing: "linear",
                  // delay: 100,
                  // borderColor: "#3b82f6",
                  // backgroundColor: "rgba(59, 130, 246, 0.2)",
                  // pointBackgroundColor: "#3b82f6",
                  // pointHoverBackgroundColor: "#3F37C9",
                  // pointBorderColor: "#fff",
                  // pointHoverBorderColor: "#fff",
                  // pointBorderWidth: 2,
                  // pointHoverBorderWidth: 2,
                  // pointRadius: 5,
                  // animateScale: true,
                  // animateRotate: true,
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    mode: "index",
                    intersect: false,
                  },
                },
                hover: {
                  mode: "nearest",
                  intersect: true,
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: "rgba(0, 0, 0, 0.05)",
                    },
                    ticks: {
                      color: "#6b7280",
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: "#6b7280",
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>

        {/* Animated Doughnut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-white/3 rounded-xl p-4 shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Feedback Type
          </h2>
          <div className="h-[250px]">
            <Chart
              type="doughnut"
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: "70%",
                animation: {
                  duration: 2000,
                  easing: "easeOutBounce",
                  animateScale: true,
                  animateRotate: true,
                },
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#6b7280",
                      font: {
                        size: 13,
                      },
                      padding: 20,
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
