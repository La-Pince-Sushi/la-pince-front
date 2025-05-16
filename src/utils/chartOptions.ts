import { ChartOptions, Chart, Title, Legend, Tooltip } from "chart.js";

// Enregistrement des plugins nécessaires
Chart.register(Title, Legend, Tooltip);

export const getDoughnutOptions = (isMobile: boolean): ChartOptions<"doughnut"> => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: isMobile ? 10 : 15, // Réduction des marges pour mobile
  },
  plugins: {
    legend: {
      position: isMobile ? "top" : "left", // Mobile : légende en haut, Desktop : légende à gauche
      labels: {
        color: "#603C3C",
        font: {
          size: isMobile ? 12 : 15, // Taille de police mobile : desktop
        },
        padding: 2,
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#FFF7E9",
      titleColor: "#603C3C",
      bodyColor: "#603C3C",
    },
    title: {
      display: true,
      text: "Etat global",
      font: {
        size: isMobile ? 16 : 20,
      },
      color: "#603C3C",
    },
  },
});

export const getPieOptions = (isMobile: boolean): ChartOptions<"pie"> => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: isMobile ? 10 : 15,
  },
  plugins: {
    legend: {
      rtl: true,
      display: !isMobile,
      position: "right",
      labels: {
        color: "#603C3C",
        font: {
          size: 15,
        },
        padding: 2, // Réduction de l'espace interne
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#FFF7E9",
      titleColor: "#603C3C",
      bodyColor: "#603C3C",
    },
    title: {
      display: true,
      text: "Dépenses par catégories",
      font: {
        size: isMobile ? 16 : 20,
      },
      color: "#603C3C",
    },
  },
});