import { useExpenseStore } from "../../store/expensesStore";
import { useEffect } from "react";
import { UpdateButton, DeleteButton, AddExpenseButton } from "../../components/common/Button.tsx";
import { useLocation } from "react-router-dom";
import "../../styles/Tables.scss"
import { MonthMenu } from "./MonthMenu.tsx";

interface ExpensesTableProps {
  limit?: number;
}

export function ExpensesTable({ limit }: ExpensesTableProps) {
  
  const getAllExpenses = useExpenseStore((state) => state.getAllExpenses);
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);
  const isLoadedExpense = useExpenseStore((state) => state.isLoadedExpense);
  
  const location = useLocation();

  useEffect(() => {
    if (!isLoadedExpense) getAllExpenses();
  }, [isLoadedExpense]);

  const filteredExpenses = useExpenseStore.use.filteredExpenses();

  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const expensesToShow = limit ? sortedExpenses.slice(0, limit) : sortedExpenses;

  return (
    <div className="container ivory-panel">
      <div className="table-bar">
        <h2 className="table-title is-size-4 m-0">Dépenses</h2>
        <div className="month-menu">
          <MonthMenu />
        </div>
      </div>

      <div>
        {location.pathname === "/expenses" && (
          <AddExpenseButton to={"/expenses/add"} label="+ Ajout Dépense" />
        )}
      </div>      

      {expensesToShow.length > 0 ? (
        <>
          {/* Table desktop */}
          <div className="is-hidden-touch table-container m-0">
            <table className="table is-fullwidth custom-table">
              <thead className="thead-beige">
                <tr>
                  <th>Catégorie</th>
                  <th>Date</th>
                  <th>Montant</th>
                  <th>Description</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {expensesToShow.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.category?.name}</td>
                      <td>{new Date(expense.date).toLocaleDateString("fr-FR")}</td>
                      <td>{Number(expense.amount).toFixed(2)}€</td>
                      <td>{expense.description}</td>
                      <td>
                        <UpdateButton to={`/expenses/edit/${expense.id}`} label="Modifier" />
                      </td>
                      <td>
                        <DeleteButton label="Supprimer" onClick={() => deleteExpense(expense.id)} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Liste mobile */}
          <ul className="is-hidden-desktop">
  {expensesToShow.map((expense) => (
      <li className="box mb-4" key={expense.id}>
        {/* Ligne 1 : Catégorie | Date | Montant */}
        <div className="columns is-mobile is-vcentered mb-0">
          <div className="column is-5 has-text-weight-semibold">{expense.category?.name}</div>
          <div className="column is-3 is-size-6 has-text-weight-bold has-text-right">{Number(expense.amount).toFixed(2)}€</div>
          <div className="column is-4">{new Date(expense.date).toLocaleDateString("fr-FR")}</div>
        </div>
        {/* Ligne 2 : Description */}
        <div className="mb-3">
        <span className="description-mobile">
          {expense.description}
        </span>
        </div>
        {/* Ligne 3 : Boutons Modifier & Supprimer */}
        <div className="buttons is-flex is-justify-content-space-between">
          <UpdateButton to={`/expenses/edit/${expense.id}`} label="Modifier" />
          <DeleteButton label="Supprimer" onClick={() => deleteExpense(expense.id)} />
        </div>
      </li>
    ))}
</ul>

        </>
      ) : (
        <p className="has-text-left mt-5">Aucune dépense n'a été trouvée.</p>
      )}
    </div>
  );
}
