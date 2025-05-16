import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useBudgetStore } from "../../store/budgetStore";
import { useCategoryStore } from "../../store/categoryStore";
import { useNavigate } from "react-router-dom";
import { showInfoToast, showWarningToast } from "../../utils/toastUtils";
import { useExpenseStore } from "../../store/expensesStore";

export function BudgetAddForm() {
  const selectRef = useRef<HTMLSelectElement>(null)
  const navigate = useNavigate();

  const addNewBudget = useBudgetStore((state) => state.addNewBudget);
  const getAllBudgets = useBudgetStore((state) => state.getAllBudgets);
  const isLoadedBudget = useBudgetStore((state) => state.isLoadedBudget);

  const categories = useCategoryStore((state) => state.categories);
  const getAllCategories = useCategoryStore((state) => state.getAllCategories);
  const isLoadedCategory = useCategoryStore((state) => state.isLoadedCategory);

  const expenses = useExpenseStore((state) => state.expenses);
  const getAllExpenses = useExpenseStore((state) => state.getAllExpenses);
  const isLoadedExpense = useExpenseStore((state) => state.isLoadedExpense);

  const initialFormState = {
    amount: "",
    categoryId: ""
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    selectRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isLoadedBudget || !isLoadedCategory) {
      if (!isLoadedBudget) getAllBudgets();
      if (!isLoadedCategory) getAllCategories();
      if (!isLoadedExpense) getAllExpenses();
    }
  }, [isLoadedBudget, isLoadedCategory]);


  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "categoryId") {
      const selectedCategoryId = Number(value);

      // Vérifier si les dépenses sont chargées
      if (!isLoadedExpense) {
        showWarningToast({ message: "Les dépenses ne sont pas chargées." });
        return;
      }

      // Calculer le montant total des dépenses pour la catégorie sélectionnée
      const totalExpenses = expenses
        .filter((expense) => expense.category_id === selectedCategoryId)
        .reduce((sum, expense) => sum + Number(expense.amount), 0);

      // Trouver le nom de la catégorie sélectionnée
      const selectedCategory = categories.find(
        (category) => category.id === Number(selectedCategoryId)
      );

      // Afficher le toast d'information
      if (selectedCategory && totalExpenses > 0) {
        showInfoToast({
          message: `Total dépenses: ${totalExpenses} €`,
          details: [`Catégorie: "${selectedCategory.name}"`]
        },
          { autoClose: 10000 });
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newBudget = {
      id: "",
      amount: Number(formData.amount),
      category_id: Number(formData.categoryId)
    };

    addNewBudget(newBudget);

    setFormData(initialFormState);

    navigate("/budgets");
  };
  return (
    <main className="container">

      <h2 className="title">Ajouter un budget</h2>
      <div className="box box-custom-form">
        <form onSubmit={handleSubmit} method="POST">
          <div className="field">
            <label className="label" htmlFor="category">
              Selection de la Catégorie
            </label>
            <div className="control">
              <div id="arrow-select" className="select select-category">
                <select
                  id="category"
                  name="categoryId"
                  aria-label="Category"
                  className="select"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    -- Choisir une catégorie --
                  </option>
                  {categories.slice().sort((a, b) => a.name.localeCompare(b.name)).map((category) => (
                    <option key={`category-${category.id}`} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="amount">
              Montant (€)
            </label>
            <div className="control">
              <input
                name="amount"
                className="input"
                type="number"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                placeholder="Ex : 25.50"
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">
                Ajouter
              </button>
            </div>
            <div className="control">
              <button
                type="button"
                className="button is-light"
                onClick={() => navigate(-1)}
              >
                Retour
              </button>
            </div>
          </div>
        </form>
      </div>

    </main>
  );
}
