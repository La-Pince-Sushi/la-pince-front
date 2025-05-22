import { TCategories } from "../types";
import { apiRequest } from "../utils/apiRequest.ts";

/**
 * Retrieves all categories from the API.
 * 
 * @returns {Promise<TCategories>} - A promise containing the list of categories.
 */
export async function getAllCategories(): Promise<TCategories> {
  return apiRequest("categories")
}