import { TExpenses } from "../types";

export function handleUniqueMonth(expenses: TExpenses) {
  const  month = expenses.map(expense => expense.date.slice(0,7));
  const UniqueMonth = [... new Set(month)];
  return UniqueMonth;
}

export function formatMonth(monthString: string): string {
  const cleaned = monthString.replace("-", "/");
  const [year, month] = cleaned.split("/").map(Number);
  const date = new Date(year, month - 1); 
  return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}
