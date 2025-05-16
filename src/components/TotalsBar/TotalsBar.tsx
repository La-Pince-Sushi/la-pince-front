import { useBudgetStore } from "../../store/budgetStore";
import { useExpenseStore } from "../../store/expensesStore";
import { useCategoryStore } from "../../store/categoryStore.ts";
import { useEffect } from "react";
import { DoughnutChart } from "../Doughnut/DoughnutChart.tsx";
import { doughnutOptions, pieOptions } from "../../utils/chartOptions.ts";
import { PieChart } from "../Pie/PieChart.tsx"
import "./TotalsBar.scss";
import "../Doughnut/Doughtnut.scss"
import "../Pie/Pie.scss"

export const TotalsBar = () => {

  const budgets = useBudgetStore(state => state.budgets);
  const expenses = useExpenseStore(state => state.expenses);
  const categories = useCategoryStore(state => state.categories)
  const isLoadedBudget = useBudgetStore(state => state.isLoadedBudget);
  const isLoadedExpense = useExpenseStore(state => state);
  const isLoadedCategory = useCategoryStore(state => state.isLoadedCategory);
  const getAllCategories = useCategoryStore(state => state.getAllCategories);
  const getAllBudgets = useBudgetStore(state => state.getAllBudgets);
  const getAllExpenses = useExpenseStore(state => state.getAllExpenses);

  useEffect(() => {
    if (!isLoadedExpense) getAllExpenses();
    if (!isLoadedBudget) getAllBudgets();
    if (!isLoadedCategory) getAllCategories();
  }, [isLoadedExpense, isLoadedBudget, isLoadedCategory]);

  const totalBudget = Math.round(
    budgets.reduce((sum, budget) => sum + Number(budget.amount), 0) * 100
  ) / 100;

  const totalExpenses = Math.round(
    expenses.reduce((sum, expense) => sum + Number(expense.amount), 0) * 100
  ) / 100;

  const remainingBudget = Number((totalBudget - totalExpenses).toFixed(2));

  const doughnutData = {
    labels: [`Budget restant: ${remainingBudget}`, `Dépenses totales: ${totalExpenses}`],
    datasets: [
      {
        data: [remainingBudget, totalExpenses],
        backgroundColor: ["#ACD7C2", "#FFB085"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };
  
  const filteredCategories = categories.filter(category =>
    expenses.some(expense => expense.category_id === category.id)
  );

  const pieData = {
    labels: filteredCategories.map(category => category.name),
    datasets: [
      {
        data: filteredCategories.map(category =>
          expenses
            .filter(expense => expense.category_id === category.id)
            .reduce((sum, expense) => sum + Number(expense.amount), 0)
        ),
        backgroundColor: filteredCategories.map((_, index) =>
          `hsl(${(index * 360) / filteredCategories.length}, 70%, 70%)`
        ),
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      {budgets.length > 0 || expenses.length > 0 ? (
        <div className="charts-container">
          {budgets.length > 0 && (
            <div className="doughnut-wrapper">
              <DoughnutChart data={doughnutData} options={doughnutOptions} />
            </div>
          )}

          {expenses.length > 0 && (
            <div className="pie-wrapper">
              <PieChart data={pieData} options={pieOptions} />
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}