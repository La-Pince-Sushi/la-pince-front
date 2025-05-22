import { IExpense, TExpenses } from '../types/index.d';
import { apiRequest } from '../utils/apiRequest';

/**
 * Retrieves all expenses from the API.
 * 
 * @returns {Promise<TExpenses>} - A promise containing the list of expenses.
 */
export async function getAllExpenses(): Promise<TExpenses> {
  return apiRequest("expenses");
}

/**
 * Adds a new expense to the API.
 * 
 * @param {IExpense} data - The expense data to add.
 * @returns {Promise<IExpense>} - A promise containing the added expense.
 */
export async function addNewExpense(data: IExpense): Promise<IExpense> {
  return apiRequest("expenses", "POST", data);
}

/**
 * Updates an existing expense in the API.
 * 
 * @param {number | string} expenseId - The ID of the expense to update.
 * @param {IExpense} data - The updated expense data.
 * @returns {Promise<IExpense>} - A promise containing the updated expense.
 */
export async function updateExpense(expenseId : number | string, data: IExpense): Promise<IExpense> {
  return apiRequest(`expenses/${expenseId}`, "PATCH", data);
};

/**
 * Deletes an expense from the API.
 * 
 * @param {number | string} expenseId - The ID of the expense to delete.
 * @returns {Promise<void>} - A promise that resolves when the expense is deleted.
 */
export async function deleteExpense(expenseId : number | string): Promise<void> {
  return apiRequest(`expenses/${expenseId}`, "DELETE");
};