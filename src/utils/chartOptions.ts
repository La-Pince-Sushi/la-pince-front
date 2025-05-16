import { ChartOptions } from "chart.js";

export const getDoughnutOptions = (isMobile: boolean): ChartOptions<"doughnut"> => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: isMobile ? 10 : 20, // Réduction des marges pour mobile
  },
  plugins: {
    legend: {
      position: isMobile ? "top" : "left", // Mobile : légende en haut, Desktop : légende à gauche
      labels: {
        color: "#603C3C",
        font: {
          size: isMobile ? 12 : 15, // Taille de police adaptée
        },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#FFF7E9",
      titleColor: "#603C3C",
      bodyColor: "#603C3C",
    },
  },
});

export const getPieOptions = (isMobile: boolean): ChartOptions<"pie"> => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: isMobile ? 10 : 20, // Réduction des marges pour mobile
  },
  plugins: {
    legend: {
      position: isMobile ? "top" : "right", // Mobile : légende en haut, Desktop : légende à droite
      labels: {
        color: "#603C3C",
        font: {
          size: isMobile ? 12 : 15, // Taille de police adaptée
        },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#FFF7E9",
      titleColor: "#603C3C",
      bodyColor: "#603C3C",
    },
  },
});