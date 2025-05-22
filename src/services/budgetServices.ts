import { IBudget, TBudgets } from "../types";
import { apiRequest } from "../utils/apiRequest";

/**
 * Retrieves all budgets from the API.
 * 
 * @returns {Promise<TBudgets>} - A promise containing the list of budgets.
 */
export async function getAllBudgets(): Promise<TBudgets> {
  return apiRequest("budgets")
}

/**
 * Adds a new budget to the API.
 * 
 * @param {IBudget} data - The budget data to add.
 * @returns {Promise<IBudget>} - A promise containing the added budget.
 */
export async function addNewBudget(data: IBudget): Promise<IBudget> {
  return apiRequest("budgets", 'POST', data)
}

/**
 * Updates an existing budget in the API.
 * 
 * @param {number | string} budgetId - The ID of the budget to update.
 * @param {IBudget} data - The updated budget data.
 * @returns {Promise<IBudget>} - A promise containing the updated budget.
 */
export async function updateBudget(budgetId: number | string, data: IBudget): Promise<IBudget> {
  return apiRequest(`budgets/${budgetId}`, 'PATCH', data)
}

/**
 * Deletes a budget from the API.
 * 
 * @param {number | string} budgetId - The ID of the budget to delete.
 * @returns {Promise<void>} - A promise that resolves when the budget is deleted.
 */
export async function deleteBudget(budgetId: number | string): Promise<void> {
  return apiRequest(`budgets/${budgetId}`, 'DELETE')
}