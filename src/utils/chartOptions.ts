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
          size: 15,
        },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: '#FFF7E9',
      titleColor: '#603C3C',
      bodyColor: '#603C3C',
    },
    title: {
      display: true,
      text: 'Bilan global',
      padding: {
        bottom: 20
      },
      color: '#603C3C',
      font: {
        size: 18,
      },
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
          size: 15,
        },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: '#FFF7E9',
      titleColor: '#603C3C',
      bodyColor: '#603C3C',
    },
    title: {
      display: true,
      text: 'Dépenses par catégories',
      padding: {
        bottom: 20
      },
      color: '#603C3C',
      font: {
        size: 18,
      },
    },
  },
};
