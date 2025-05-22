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
 * Generates a pastel HSL color based on an index and the total number of elements.
 * 
 * @param {number} index - The index of the element.
 * @param {number} total - The total number of elements.
 * @returns {string} - An HSL color as a string.
 */
export const generateHSLColor = (index: number, total: number): string => {
  const hue = (index * 360) / total; // Répartit les teintes sur la roue chromatique
  const saturation = 50; // Saturation réduite pour un effet pastel
  const lightness = 80; // Luminosité élevée pour un effet pastel
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

/**
 * Generates a list of pastel HSL colors for a set of elements, excluding primary colors.
 * 
 * @param {number} length - The total number of elements.
 * @returns {string[]} - An array of HSL colors.
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