import { IExpense, TExpenses } from '../types/index.d';
import { apiRequest } from '../utils/apiRequest';

export async function getAllExpenses(): Promise<TExpenses> {
  return apiRequest("expenses");
}

export async function addNewExpense(data: IExpense): Promise<IExpense> {
  return apiRequest("expenses", "POST", data);
}

export async function updateExpense(expenseId : number | string, data: IExpense): Promise<IExpense> {
  return apiRequest(`expenses/${expenseId}`, "PATCH", data);
};

export async function deleteExpense(expenseId : number | string): Promise<void> {
  return apiRequest(`expenses/${expenseId}`, "DELETE");
};