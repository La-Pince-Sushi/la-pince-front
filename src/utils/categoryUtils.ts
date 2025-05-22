import { ICategory } from "../types";

/**
 * Sorts categories alphabetically, placing the "Other" category at the end.
 * 
 * @param {ICategory[]} categories - The list of categories to sort.
 * @returns {ICategory[]} - The sorted list of categories.
 */
export function getSortedCategories(categories: ICategory[]): ICategory[] {
  return categories.slice().sort((a, b) => {
    if (a.name === "Autres") return 1; // Place "Autres" en dernier
    if (b.name === "Autres") return -1; // Place "Autres" en dernier
    return a.name.localeCompare(b.name); // Tri alphabétique pour les autres
  });
}