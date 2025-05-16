// Couleurs primaires à exclure
const primaryColors = [
  "#FFF7E9",
  "#D4E3FC",
  "#ACD7C2",
  "#FFB085",
  "#D77D82",
  "#8B5E3C",
  "#603C3C",
  "#FFE3AE",
  "#F0DF87",
  "#A5D8FF",
  "#98E08C",
  "#FF6B6B",
];

/**
 * Génère une couleur HSL pastel basée sur un index et le nombre total d'éléments.
 * @param index Index de l'élément
 * @param total Nombre total d'éléments
 * @returns Une couleur HSL sous forme de chaîne
 */
export const generateHSLColor = (index: number, total: number): string => {
  const hue = (index * 360) / total; // Répartit les teintes sur la roue chromatique
  const saturation = 50; // Saturation réduite pour un effet pastel
  const lightness = 80; // Luminosité élevée pour un effet pastel
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

/**
 * Génère une liste de couleurs HSL pastel pour un ensemble d'éléments, en excluant les couleurs primaires.
 * @param length Nombre total d'éléments
 * @returns Un tableau de couleurs HSL
 */
export const generateCategoryColors = (length: number): string[] => {
  const colors = [];
  for (let i = 0; i < length; i++) {
    let color;
    do {
      color = generateHSLColor(i, length);
    } while (primaryColors.includes(color)); // Vérifie que la couleur n'est pas une couleur primaire
    colors.push(color);
  }
  return colors;
};

/**
 * Note :
 * - Cette fonction utilise une palette générée dynamiquement en fonction de l'index et du total.
 * - Les couleurs générées sont fixes pour un index donné, garantissant une association constante.
 * - Les couleurs générées sont orientées vers des teintes pastel grâce à une saturation réduite (50%)
 *   et une luminosité élevée (80%).
 * - Les couleurs contenues dans `primaryColors` sont exclues.
 * - Si une couleur générée est trouvée dans `primaryColors`, elle est recalculée.
 */