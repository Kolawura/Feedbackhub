import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VisitorAnalytics = () => {
  const [selected, setSelected] = useState("optionOne");

  // Time range options
  const timeRanges = [
    { id: "optionOne", label: "30 days", value: "30days" },
    { id: "optionTwo", label: "12 months", value: "12months" },
    { id: "optionThree", label: "4 weeks", value: "4weeks" },
    { id: "optionFour", label: "7 days", value: "7days" },
    { id: "optionFive", label: "24 hours", value: "24hours" },
  ];

  const getChartData = (range: string) => {
    switch (range) {
      case "30days":
        return {
          labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
          ],
          data: [
            1200, 1750, 1420, 2100, 1850, 2600, 1950, 3100, 1700, 2450, 2250,
            1370, 1980, 1620, 2300, 1200, 2500, 1800, 2050, 1500, 2700, 1600,
            3200, 2100, 1550, 3800, 1400, 4200, 1750, 3900, 4800,
          ],
          label: "30 Days",
        };
      case "12months":
        return {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          data: [
            1200, 1800, 1500, 2000, 2200, 2500, 3000, 2800, 2600, 2400, 2100,
            2300,
          ],
          label: "12 Months",
        };
      case "4weeks":
        return {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          data: [800, 950, 1100, 1050],
          label: "4 Weeks",
        };
      case "7days":
        return {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          data: [120, 200, 150, 170, 220, 180, 90],
          label: "7 Days",
        };
      case "24hours":
        return {
          labels: ["12AM", "6AM", "12PM", "6PM"],
          data: [10, 30, 80, 60],
          label: "24 Hours",
        };
      default:
        return {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          data: [120, 200, 150, 170, 220],
          label: "Default Range",
        };
    }
  };

  // Get current range value from selected option
  const currentRange =
    timeRanges.find((range) => range.id === selected)?.value || "30days";
  const chartData = getChartData(currentRange);

  const data = {
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#9CA3AF",
        },
        grid: {
          color: "#bbb",
          borderDash: [5, 5],
          borderColor: "#ddd6d6",
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: "#9CA3AF",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-white/3 shadow rounded-lg p-4 m-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Analytics
          </h2>
          <p className="text-gray-400 dark:text-gray-300">{`Visitors analytics for the past ${chartData.label}`}</p>
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default VisitorAnalytics;
