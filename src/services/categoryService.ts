import { TCategories } from "../types";
import { apiRequest } from "../utils/apiRequest.ts";

export async function getAllCategories(): Promise<TCategories> {
  return apiRequest("categories")
}