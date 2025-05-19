import { useBudgetStore } from "../../store/budgetStore";
import { useExpenseStore } from "../../store/expensesStore";
import { useCategoryStore } from "../../store/categoryStore.ts";
import { useEffect, useState } from "react";
import { DoughnutChart } from "../Doughnut/DoughnutChart.tsx";
import { getDoughnutOptions, getPieOptions } from "../../utils/chartOptions.ts";
import { PieChart } from "../Pie/PieChart.tsx";
import { generateCategoryColors } from "../../utils/colorsUtils";
import "./TotalsBar.scss";

export const TotalsBar = () => {
  const budgets = useBudgetStore(state => state.budgets);  
  const filteredExpenses = useExpenseStore(state => state.filteredExpenses)
  const categories = useCategoryStore(state => state.categories);
  const isLoadedBudget = useBudgetStore(state => state.isLoadedBudget);
  const isLoadedExpense = useExpenseStore(state => state.isLoadedExpense);
  const isLoadedCategory = useCategoryStore(state => state.isLoadedCategory);
  const getAllCategories = useCategoryStore(state => state.getAllCategories);
  const getAllBudgets = useBudgetStore(state => state.getAllBudgets);
  const getAllExpenses = useExpenseStore(state => state.getAllExpenses);  

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    if (!isLoadedExpense) getAllExpenses();
    if (!isLoadedBudget) getAllBudgets();
    if (!isLoadedCategory) getAllCategories();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoadedExpense, isLoadedBudget, isLoadedCategory]);

  const totalBudget = Math.round(
    budgets.reduce((sum, budget) => sum + Number(budget.amount), 0) * 100
  ) / 100;

  const totalExpenses = Math.round(
    filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0) * 100
  ) / 100;

  const remainingBudget = Number((totalBudget - totalExpenses).toFixed(2));
  const remainingBudgetColor = remainingBudget <= 0 ? "#FF6B6B" : "#ACD7C2";

  const doughnutData = {
    labels: [`Budget restant ${remainingBudget} €`, `Dépenses totales ${totalExpenses} €`],
    datasets: [
      {
        data: [remainingBudget, totalExpenses],
        backgroundColor: [remainingBudgetColor, "#FFB085"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const filteredCategories = categories.filter(category =>
    filteredExpenses.some(expense => expense.category_id === category.id)
  );

  const pieData = {
    labels: filteredCategories.map(category => category.name),
    datasets: [
      {
        data: filteredCategories.map(category =>
          filteredExpenses
            .filter(expense => expense.category_id === category.id)
            .reduce((sum, expense) => sum + Number(expense.amount), 0)
        ),
        backgroundColor: generateCategoryColors(filteredCategories.length),
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {budgets.length > 0 || filteredExpenses.length > 0 ? (
        <div className={`charts-container ${isMobile ? "mobile" : ""}`}>
          {budgets.length > 0 && (
            <div className="doughnut-wrapper">
              <DoughnutChart data={doughnutData} options={getDoughnutOptions(isMobile)} />
            </div>
          )}

          {filteredExpenses.length > 0 && (
            <div className="pie-wrapper">
              <PieChart data={pieData} options={getPieOptions(isMobile)} />
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};