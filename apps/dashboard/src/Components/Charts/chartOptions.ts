export const chartOptions = (c: {
  amber: string;
  amberAlpha: string;
  red: string;
  green: string;
  blue: string;
  muted: string;
  dim: string;
  gridLine: string;
  tooltipBg: string;
  tooltipText: string;
  tooltipBorder: string;
  border: string;
}) => {
  const tooltipPlugin = {
    backgroundColor: c.tooltipBg,
    titleColor: c.tooltipText,
    bodyColor: c.muted,
    borderColor: c.tooltipBorder,
    borderWidth: 1,
  };

  const baseScales = {
    y: {
      beginAtZero: true,
      grid: { color: c.gridLine },
      ticks: {
        color: c.dim,
        font: { family: "'DM Mono', monospace", size: 10 },
      },
      border: { color: c.border },
    },
    x: {
      grid: { display: false },
      ticks: {
        color: c.dim,
        font: { family: "'DM Mono', monospace", size: 10 },
      },
      border: { color: c.border },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: tooltipPlugin },
    scales: baseScales,
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: tooltipPlugin },
    scales: baseScales,
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: c.muted,
          font: { family: "'DM Mono', monospace", size: 10 },
          boxWidth: 10,
          padding: 12,
        },
      },
      tooltip: tooltipPlugin,
    },
  };

  return {
    lineOptions,
    barOptions,
    doughnutOptions,
  };
};
