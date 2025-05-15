import { useExpenseStore } from "../../store/expensesStore";
import { useEffect } from "react";
import { UpdateButton, DeleteButton, AddExpenseButton } from "../../components/common/Button.tsx";
import { useLocation } from "react-router-dom";
import "../../styles/Tables.scss"

interface ExpensesTableProps {
  limit?: number;
}

export function ExpensesTable({ limit }: ExpensesTableProps) {
  const expenses = useExpenseStore((state) => state.expenses);
  const getAllExpenses = useExpenseStore((state) => state.getAllExpenses);
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);
  const isLoadedExpense = useExpenseStore((state) => state.isLoadedExpense);

  const location = useLocation();

  useEffect(() => {
    if (!isLoadedExpense) getAllExpenses();
  }, [isLoadedExpense]);

  const expensesToShow = limit ? expenses.slice(0, limit) : expenses;

  return (
    <div className="container ivory-panel">
      <h2 className="table-title is-size-4 m-0">Dépenses</h2>

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
              <li className="grid box" key={expense.id}>
                <div className="cell category">{expense.category?.name}</div>
                <div className="cell amount">{Number(expense.amount).toFixed(2)}€</div>
                <div className="cell date">{new Date(expense.date).toLocaleDateString("fr-FR")}</div>
                <div className="cell description">{expense.description}</div>
                <div className="cell editing">
                  <UpdateButton to={`/expenses/edit/${expense.id}`} label="Modifier" />
                </div>
                <div className="cell deleting">
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
