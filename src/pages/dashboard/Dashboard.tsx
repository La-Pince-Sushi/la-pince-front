import { ExpensesTable } from "../expenses/ExpensesTable";
import { TotalsBar } from "../../components/TotalsBar/TotalsBar.tsx";
import { AddBudgetButton, AddExpenseButton } from "../../components/common/Button.tsx";
import "../../components/Header.scss";
import "../../components/layout/HeaderLayout"
import "./dashboard.scss";

export function Dashboard() {
  return (
    <div className="container">
      <div className="charts-container">
        <TotalsBar />
      </div>

      <div className="actions">
        <AddBudgetButton to={"/budgets/add"} label="+ Ajout Budget" />
        <AddExpenseButton to={"/expenses/add"} label="+ Ajout Dépense" />
      </div>

      <ExpensesTable limit={5} />

    </div>
  );
}

