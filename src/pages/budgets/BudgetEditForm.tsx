import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCategoryStore } from "../../store/categoryStore";
import { useBudgetStore } from "../../store/budgetStore.ts";

export function BudgetEditForm() {
  const selectRef = useRef<HTMLSelectElement>(null)
  const { id } = useParams();
  const navigate = useNavigate();

  const budgets = useBudgetStore((state) => state.budgets);
  const updateBudget = useBudgetStore((state) => state.updateBudget);
  const getAllBudgets = useBudgetStore((state) => state.getAllBudgets);
  const isLoadedBudget = useBudgetStore((state) => state.isLoadedBudget);

  const categories = useCategoryStore((state) => state.categories);
  const getAllCategories = useCategoryStore((state) => state.getAllCategories);
  const isLoadedCategory = useCategoryStore((state) => state.isLoadedCategory);

  const [formData, setFormData] = useState({
    amount: "",
    alert: "",
    categoryId: "",
  });

  const budgetToEdit = budgets.find((budget) => budget.id === Number(id));

  useEffect(() => {
    selectRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isLoadedBudget || !isLoadedCategory) {
      if (!isLoadedBudget) getAllBudgets();
      if (!isLoadedCategory) getAllCategories();
    }
  }, [isLoadedBudget, isLoadedCategory]);

  useEffect(() => {
    if (budgetToEdit) {
      setFormData({
        amount: `${budgetToEdit.amount}`,
        alert: `${budgetToEdit.alert}`,
        categoryId: `${budgetToEdit.category_id}`,
      });
    }
  }, [budgetToEdit]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedBudget = {
      id: Number(id),
      amount: formData.amount,
      category_id: formData.categoryId
    };

    updateBudget(Number(id), updatedBudget);
  }

  if (!budgetToEdit) return <p>Budget non trouvé.</p>;

  return (
    <main className="container">
      
        <h2 className="title">Modifier le budget</h2>
        <div className="box box-custom-form">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="categoryId">Catégorie</label>
              <div className="control">
                <div className="select">
                  <select
                    id="category"
                    name="categoryId"
                    className="select"
                    value={formData.categoryId}
                    onChange={handleChange}
                  >
                    <option disabled value="">-- Choisir une catégorie --</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="amount">Montant (€)</label>
              <div className="control">
                <input
                  name="amount"
                  type="number"
                  className="input"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" type="submit" onClick={() => navigate("/budgets")}>Enregistrer</button>
              </div>
              <div className="control">
                <button type="button" className="button is-light" onClick={() => navigate("/budgets")}>Retour</button>
              </div>
            </div>
          </form>
        </div>
      
    </main>
  );
}


