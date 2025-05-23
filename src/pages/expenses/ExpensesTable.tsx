import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UpdateButton, DeleteButton, AddExpenseButtonTable } from "../../components/common/Button.tsx";
import { MonthMenu } from "./MonthMenu.tsx";
import { useExpenseStore } from "../../store/expensesStore";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider } from '@mui/material/styles';
import { paginationTheme } from "../../utils/paginationTheme";
import "../../styles/Tables.scss";

export function ExpensesTable() {
  const location = useLocation();
  const isLoadedExpense = useExpenseStore((state) => state.isLoadedExpense);
  const filteredExpenses = useExpenseStore((state) => state.filteredExpenses);
  const monthSelected = useExpenseStore((state) => state.monthSelected);
  const getAllExpenses = useExpenseStore((state) => state.getAllExpenses);
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);
  const setMonthSelected = useExpenseStore((state) => state.setMonthSelected);
  const isMobile = window.innerWidth <= 768;
  const isExpensesPage = location.pathname === "/expenses";

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = location.pathname === "/dashboard" ? 5 : 10;

  // Réinitialiser la page à 1 lorsque le filtre de mois change
  useEffect(() => {
    setCurrentPage(1);
  }, [monthSelected]);

  useEffect(() => {
    if (location.pathname === "/dashboard" || location.pathname === "/expenses") {
      setMonthSelected("all");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isLoadedExpense) {
      getAllExpenses();
    }
  }, [isLoadedExpense, getAllExpenses]);

  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Calculate paginated data
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedExpenses = sortedExpenses.slice(startIndex, startIndex + rowsPerPage);

  // Ajout d'un effect pour vérifier si la page actuelle est valide après tout changement dans les dépenses filtrées
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredExpenses.length / rowsPerPage));
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [filteredExpenses, currentPage, rowsPerPage]);

  // Fonction modifiée pour la suppression avec gestion de pagination
  const handleDeleteExpense = (expenseId: string | number) => {
    // Calculer combien d'éléments resteront sur la page actuelle après suppression
    const currentItems = paginatedExpenses.length;
    
    // Si c'est le seul élément de la page et qu'on n'est pas sur la première page
    if (currentItems === 1 && currentPage > 1) {
      // Passer à la page précédente avant de supprimer
      setCurrentPage(prev => Math.max(1, prev - 1));
    }
    
    // Supprimer l'élément après avoir ajusté la pagination si nécessaire
    deleteExpense(expenseId);
  };

  return (
    <div className={`container ivory-panel ${isExpensesPage ? "table-panel" : ""}`}>
      <div className="table-bar">
        <h2 className="table-title is-size-4 m-0">Dépenses</h2>
        <div className="month-menu">
          {/* Menu pour changer le mois sélectionné */}
          <MonthMenu
            selectedMonth={monthSelected}
            onChange={(month) => setMonthSelected(month)}
          />
        </div>
      </div>

      <div>
        {location.pathname === "/expenses" && (
          <AddExpenseButtonTable to={"/expenses/add"} label="+ Ajout Dépense" />
        )}
      </div>

      {paginatedExpenses.length > 0 ? (
        <>
          {/* Table desktop */}
          <div className="is-hidden-touch table-container" id="no-margin">
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
                {paginatedExpenses
                  .slice()
                  .sort((a, b) => {
                    const dateA = new Date(a.date as string).getTime();
                    const dateB = new Date(b.date as string).getTime();
                    return dateB - dateA;
                  })
                  .map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.category?.name}</td>
                      <td>{new Date(expense.date).toLocaleDateString("fr-FR")}</td>
                      <td>{Number(expense.amount).toFixed(2)}€</td>
                      <td>{expense.description}</td>
                      <td>
                        <UpdateButton to={`/expenses/edit/${expense.id}`} label="Modifier" />
                      </td>
                      <td>
                        <DeleteButton 
                          label="Supprimer" 
                          onClick={() => handleDeleteExpense(expense.id)} 
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Liste mobile */}
          <ul className="is-hidden-desktop">
            {sortedExpenses
              .slice()
              .sort((a, b) => {
                const dateA = new Date(a.date as string).getTime();
                const dateB = new Date(b.date as string).getTime();
                return dateB - dateA;
              })
              .map((expense) => (
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
                    <DeleteButton label="Supprimer" onClick={() => handleDeleteExpense(expense.id)} />
                  </div>
                </li>
              ))}
          </ul>

          {/* Pagination avec ThemeProvider pour appliquer le style personnalisé */}
          <div className="pagination-wrapper">
            <ThemeProvider theme={paginationTheme}>
              <Pagination
                count={Math.ceil(filteredExpenses.length / rowsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size= {isMobile ? "large" : "medium"}
                siblingCount={1}
                boundaryCount={1}
              />
            </ThemeProvider>
          </div>
        </>
      ) : (
        <p className="has-text-left mt-5">Aucune dépense n'a été trouvée.</p>
      )}
    </div>
  );
}
