export const visitorsChatOptions = (
  c: {
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
  },
  traffic: any,
  deviceData: any,
  platformData: any,
) => {
  const trafficChart = {
    labels: traffic?.labels ?? [],
    datasets: [
      {
        label: "Sessions",
        data: traffic?.data ?? [],
        backgroundColor: `${c.blue}70`,
        borderColor: c.blue,
        borderWidth: 1,
        borderRadius: 3,
      },
    ],
  };
  const deviceChart = {
    labels: deviceData.map((d: any) => d.device),
    datasets: [
      {
        data: deviceData.map((d: any) => d.count),
        backgroundColor: [c.blue, c.amber, c.green],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };
  const platformChart = {
    labels: platformData.map((d: any) => d.platform),
    datasets: [
      {
        data: platformData.map((d: any) => d.count),
        backgroundColor: [c.amber, c.blue, c.green, c.muted, c.red],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };
  return { trafficChart, deviceChart, platformChart };
};
