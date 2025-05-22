import { ChartOptions, Chart, Title, Legend, Tooltip, SubTitle } from "chart.js";

/**
 * Generates options for a doughnut chart.
 * 
 * @param {boolean} isMobile - Indicates if the display is on mobile.
 * @returns {ChartOptions<"doughnut">} - Configured options for the chart.
 */
Chart.register(Title, Legend, Tooltip, SubTitle);

export const getDoughnutOptions = (isMobile: boolean): ChartOptions<"doughnut"> => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: isMobile ? 10 : 15, // Réduction des marges pour mobile
  },
  plugins: {
    legend: {
      position: isMobile ? "top" : "right", // Mobile : légende en haut, Desktop : légende à gauche
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
      callbacks: {
        label: (context) => {
          const value = context.raw; // Récupère la valeur brute
          return `${value} €`; // Ajoute le symbole €
        },
      },
    },
    title: {
      display: true,
      text: "État global",
      font: {
        size: isMobile ? 16 : 20,
      },
      color: "#603C3C",
    },
  },
});

/**
 * Generates options for a pie chart.
 * 
 * @param {boolean} isMobile - Indicates if the display is on mobile.
 * @returns {ChartOptions<"pie">} - Configured options for the chart.
 */
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
      position: "left",
      labels: {
        color: "#603C3C",
        font: {
          size: 15,
        },
        padding: 2,
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#FFF7E9",
      titleColor: "#603C3C",
      bodyColor: "#603C3C",
      callbacks: {
        label: (context) => {
          const value = context.raw; // Récupère la valeur brute
          return `${value} €`; // Ajoute le symbole €
        },
      },
    },
    title: {
      display: true,
      text: "Dépenses par catégories",
      font: {
        size: isMobile ? 16 : 20,
      },
      color: "#603C3C",
    },
    subtitle: isMobile
      ? {
          display: true,
          text: "Appuyez sur une part pour afficher les détails.",
          font: {
            size: 12,
          },
          color: "#603C3C",
          padding: {
            bottom: 5,
          },
        }
      : undefined,
  },
});