import { useEffect } from "react";
import { useBudgetStore } from "../../store/budgetStore.ts";
import { UpdateButton, DeleteButton, AddBudgetButton } from "../../components/common/Button.tsx";
import "../../styles/Tables.scss";

export function BudgetsTable() {
  const budgets = useBudgetStore((state) => state.budgets);
  const getAllBudgets = useBudgetStore((state) => state.getAllBudgets);
  const deleteBudget = useBudgetStore((state) => state.deleteBudget);
  const isLoadedBudget = useBudgetStore((state) => state.isLoadedBudget);

  useEffect(() => {
    if (!isLoadedBudget) getAllBudgets();
  }, [isLoadedBudget]);

  return (
    <div className="container ivory-panel">
      <h2 className="table-title is-size-4 m-0">Budgets</h2>

      <div>
      <AddBudgetButton to={"/budgets/add"} label="+ Ajout Budget" />
      </div>

      {budgets.length > 0 ? (
        <>
          {/* Table for desktop */}
          <div className="is-hidden-touch table-container">
            <table className="table is-fullwidth custom-table">
              <thead className="thead-beige">
                <tr>
                  <th>Catégorie</th>
                  <th>Montant</th>
                  <th>Alerte</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {budgets.slice().sort((a, b) => (a.category?.name || "").localeCompare(b.category?.name || "")).map((budget) => (
                  <tr key={budget.id}>
                    <td>{budget.category?.name}</td>
                    <td>{Number(budget.amount).toFixed(2)}€</td>
                    <td>
                      <UpdateButton to={`/budgets/edit/${budget.id}`} label="Modifier" />
                    </td>
                    <td>
                      <DeleteButton label="Supprimer" onClick={() => deleteBudget(budget.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <ul className="is-hidden-desktop">
            {budgets.slice().sort((a, b) => (a.category?.name || "").localeCompare(b.category?.name || "")).map((budget) => (
              <li className="box mb-4" key={budget.id}>
                <p><strong>Catégorie :</strong> {budget.category?.name}</p>
                <p><strong>Montant :</strong> {Number(budget.amount).toFixed(2)}€</p>
                <div className="buttons mt-2">
                  <UpdateButton to={`/budgets/edit/${budget.id}`} label="Modifier" />
                  <DeleteButton label="Supprimer" onClick={() => deleteBudget(budget.id)} />
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="has-text-left mt-5">Aucun budget n'a été trouvé.</p>
      )}
    </div>
  );
}
