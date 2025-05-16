import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useExpenseStore } from "../../store/expensesStore";
import { useCategoryStore } from "../../store/categoryStore";
import { IExpense } from "../../types";
import { useBudgetStore } from "../../store/budgetStore";
import "../../styles/Tables.scss"

export function ExpensesAddForm() {
  const selectRef = useRef<HTMLSelectElement>(null)
  const navigate = useNavigate();

  const addNewExpense = useExpenseStore((state) => state.addNewExpense);
  const getAllExpenses = useExpenseStore((state) => state.getAllExpenses);
  const isLoadedExpense = useExpenseStore((state) => state.isLoadedExpense);

  const categories = useCategoryStore((state) => state.categories);
  const getAllCategories = useCategoryStore((state) => state.getAllCategories);
  const isLoadedCategory = useCategoryStore((state) => state.isLoadedCategory);

  const budgets = useBudgetStore((state) => state.budgets);

  const initialFormState = {
    amount: "",
    description: "",
    date: "",
    categoryId: ""
  };

  const [showModal, setShowModal] = useState(false);
  const [pendingExpense, setPendingExpense] = useState<IExpense | null>(null);

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    selectRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isLoadedExpense || !isLoadedCategory) {
      if (!isLoadedExpense) getAllExpenses();
      if (!isLoadedCategory) getAllCategories();
    }
  }, [isLoadedExpense, isLoadedCategory]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newExpense: IExpense = {
      id: "",
      amount: Number(formData.amount),
      description: formData.description,
      date: new Date(formData.date).toISOString().split("T")[0],
      category_id: Number(formData.categoryId)
    };

    const categoryId = Number(formData.categoryId);
    const budget = budgets.find((b) => b.category_id === categoryId);

    if (budget) {
      const expensesForCategory = useExpenseStore
        .getState()
        .expenses.filter((e) => e.category_id === categoryId);

      const currentTotal = expensesForCategory.reduce(
        (sum, e) => sum + Number(e.amount),
        0
      );
      const newTotal = Number(currentTotal) + Number(formData.amount);

      if (budget.alert && newTotal >= budget.alert) {
        setPendingExpense(newExpense);
        setShowModal(true); // Afficher la modale
        return;
      }
      addNewExpense(newExpense);
      navigate(-1);
    }
    if (!budget) {
      addNewExpense(newExpense);
      setFormData(initialFormState);
      navigate(-1);
    }
  };

  const handleConfirmExpense = () => {
    if (!pendingExpense) return;

    addNewExpense(pendingExpense);
    setPendingExpense(null);
    setShowModal(false);
    navigate(-1);
  };

  const handleCancelExpense = () => {
    setPendingExpense(null);
    setShowModal(false);
  };

  return (
    <main className="container">
      
        <h2 className="title">Ajouter une dépense</h2>
        <div className="box box-custom-form">
          <form onSubmit={handleSubmit} method="POST">
            <div className="field">
              <label className="label" htmlFor="category">
                Sélection de la Catégorie
              </label>
              <div className="control">
                <div className="select">
                  <select
                    id="category"
                    name="categoryId"
                    className="select"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
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
              <label className="label" htmlFor="description">
                Description de la dépense
              </label>
              <div className="control">
                <input
                  name="description"
                  className="input"
                  type="text"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Ex : Courses, Restaurant..."
                  required
                />
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
                  min="0.01"
                  step="0.01"
                  placeholder="Ex : 25.50"
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="date">
                Date
              </label>
              <div className="control">
                <input
                  name="date"
                  className="input"
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
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
                <button type="button" className="button is-light" onClick={() => navigate(-1)}>
                  Retour
                </button>
              </div>
            </div>
          </form>
        </div>
        
        {/* Modale de confirmation */}
        {showModal && (
          <div className="modal is-active">
            <div
              className="modal-background"
              onClick={handleCancelExpense}
            ></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Dépassement de budget</p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={handleCancelExpense}
                ></button>
              </header>
              <section className="modal-card-body">
                <p>
                  Cette dépense va faire dépasser le seuil d’alerte du budget.
                </p>
                <p>Souhaitez-vous vraiment continuer ?</p>
              </section>
              <footer className="modal-card-foot">
                <button
                  className="button is-danger"
                  onClick={handleConfirmExpense}
                >
                  Oui, enregistrer quand même
                </button>
                <button className="button" onClick={handleCancelExpense}>
                  Annuler
                </button>
              </footer>
            </div>
          </div>
        )}
     
    </main>
  );
}
