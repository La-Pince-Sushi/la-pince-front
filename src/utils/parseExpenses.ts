import { ALL_MONTHS } from "../constant/constant";
import { TExpenses } from "../types";

/**
 * Extracts the year and month from an ISO date.
 * 
 * @param {string} dateISO - The ISO date.
 * @returns {string} - The year and month in "YYYY-MM" format.
 */
export function getYearMonthFromISO(dateISO: string) {
  return dateISO.slice(0,7);
}

/**
 * Retrieves a list of unique months from the expenses.
 * 
 * @param {TExpenses} expenses - The list of expenses.
 * @returns {string[]} - A list of unique months sorted in descending order.
 */
export function handleUniqueMonth(expenses: TExpenses) {
  const  month = expenses.map(expense => getYearMonthFromISO(expense.date));
  const UniqueMonth = [... new Set(month)].sort().reverse();
  return UniqueMonth;
}

/**
 * Formats a month in "MMMM YYYY" format in French.
 * 
 * @param {string} monthString - The month in "YYYY-MM" format.
 * @returns {string} - The formatted month in French.
 */
export function formatMonth(monthString: string): string {
  const cleaned = monthString.replace("-", "/");
  const [year, month] = cleaned.split("/").map(Number);
  const date = new Date(year, month - 1); 
  return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

/**
 * Filters expenses by the selected month.
 * 
 * @param {TExpenses} expenses - The list of expenses.
 * @param {string} monthSelected - The selected month (or "ALL_MONTHS").
 * @returns {TExpenses} - The filtered list of expenses.
 */
export function filterExpensesByMonth(expenses: TExpenses, monthSelected: string) {
  if(!monthSelected || monthSelected === ALL_MONTHS) return expenses;
  
  const expensesFiltered = expenses.filter((expense) => {
    const dateMonth = expense.date.slice(0,7);
    return dateMonth === monthSelected
  });
  return expensesFiltered;
}
