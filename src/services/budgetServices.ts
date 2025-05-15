import { IBudget, TBudgets } from "../types";
import { apiRequest } from "../utils/apiRequest";

export async function getAllBudgets(): Promise<TBudgets> {
  return apiRequest("budgets")
}

export async function addNewBudget(data: IBudget): Promise<IBudget> {
  return apiRequest("budgets", 'POST', data)
}

export async function updateBudget(budgetId: number | string, data: IBudget): Promise<IBudget> {
  return apiRequest(`budgets/${budgetId}`, 'PATCH', data)
}

export async function deleteBudget(budgetId: number | string): Promise<void> {
  return apiRequest(`budgets/${budgetId}`, 'DELETE')
}