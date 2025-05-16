import { ChartOptions, Chart, Title } from "chart.js";

Chart.register(Title);

export const doughnutOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'left',
      labels: {
        color: '#603C3C',
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: '#FFF7E9',
      titleColor: '#603C3C',
      bodyColor: '#603C3C',
    },
  },
};

export const pieOptions: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: '#603C3C',
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: '#FFF7E9',
      titleColor: '#603C3C',
      bodyColor: '#603C3C',
    },
  },
};
