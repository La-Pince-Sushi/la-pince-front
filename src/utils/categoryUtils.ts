import { ICategory } from "../types";

/**
 * Trie les catégories par ordre alphabétique, en plaçant la catégorie "Autres" en dernière position.
 * 
 * @param {ICategory[]} categories - Liste des catégories à trier.
 * @returns {ICategory[]} - Liste triée des catégories.
 */
export function getSortedCategories(categories: ICategory[]): ICategory[] {
  return categories.slice().sort((a, b) => {
    if (a.name === "Autres") return 1; // Place "Autres" en dernier
    if (b.name === "Autres") return -1; // Place "Autres" en dernier
    return a.name.localeCompare(b.name); // Tri alphabétique pour les autres
  });
}