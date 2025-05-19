import { ExpensesTable } from "../expenses/ExpensesTable";
import { TotalsBar } from "../../components/TotalsBar/TotalsBar.tsx";
import { AddBudgetButton, AddExpenseButton } from "../../components/common/Button.tsx";
import "../../components/Header.scss";
import "../../components/layout/HeaderLayout"
import "./dashboard.scss";
import { useExpenseStore } from "../../store/expensesStore.ts";
import { formatMonth } from "../../utils/resetExpenses.ts";

export function Dashboard() {
const currentMonth = useExpenseStore((state) => state.monthSelected)

  return (
    <div className="container">
      <h1 id="dashboard-title" className="has-text-centered">
        {currentMonth === "all" ? "Situation pour toutes les dépenses" : `Situation pour le mois de ${formatMonth(currentMonth)}`}
      </h1>
      <TotalsBar />

      <div className="actions">
        <AddBudgetButton to={"/budgets/add"} label="+ Ajout Budget" />
        <AddExpenseButton to={"/expenses/add"} label="+ Ajout Dépense" />
      </div>

      <ExpensesTable limit={5} />

    </div>
  );
}

