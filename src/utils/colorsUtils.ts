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
 * Génère une couleur HSL basée sur un index et le nombre total d'éléments.
 * @param index Index de l'élément
 * @param total Nombre total d'éléments
 * @returns Une couleur HSL sous forme de chaîne
 */
export const generateHSLColor = (index: number, total: number): string => {
  const hue = (index * 360) / total; // Répartit les teintes sur la roue chromatique
  const saturation = 70; // Saturation fixe à 70%
  const lightness = 70; // Luminosité fixe à 70%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

/**
 * Génère une liste de couleurs HSL pour un ensemble d'éléments, en excluant les couleurs primaires.
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
 * - Cette fonction utilise une boucle `do...while` pour garantir que chaque couleur générée
 *   n'est pas incluse dans le tableau `primaryColors`.
 * - La fonction `generateHSLColor` est appelée pour générer une couleur unique basée sur l'index.
 * - Si une couleur générée est trouvée dans `primaryColors`, elle est recalculée jusqu'à ce qu'une
 *   couleur valide soit trouvée.
 * - Une fois une couleur valide trouvée, elle est ajoutée au tableau `colors`.
 * - À la fin, la fonction retourne un tableau contenant uniquement des couleurs uniques et valides.
 */