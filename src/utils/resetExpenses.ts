import { ALL_MONTHS } from "../constant/constant";
import { TExpenses } from "../types";

export function handleUniqueMonth(expenses: TExpenses) {
  const  month = expenses.map(expense => expense.date.slice(0,7));
  const UniqueMonth = [... new Set(month)].sort().reverse();
  return UniqueMonth;
}

export function formatMonth(monthString: string): string {
  const cleaned = monthString.replace("-", "/");
  const [year, month] = cleaned.split("/").map(Number);
  const date = new Date(year, month - 1); 
  return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

export function filterExpensesByMonth(expenses: TExpenses, monthSelected: string) {
  if(!monthSelected || monthSelected === ALL_MONTHS) return expenses;
  
  const expensesFiltered = expenses.filter((expense) => {
    const dateMonth = expense.date.slice(0,7);
    return dateMonth === monthSelected
  });
  return expensesFiltered;
}
