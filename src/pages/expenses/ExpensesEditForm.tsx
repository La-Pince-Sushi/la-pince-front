import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IExpense } from "../../types";
import { useExpenseStore } from "../../store/expensesStore";
import { useCategoryStore } from "../../store/categoryStore";
import { useBudgetStore } from "../../store/budgetStore";

export function ExpensesEditForm() {
  const selectRef = useRef<HTMLSelectElement>(null)
  const { id } = useParams();
  const navigate = useNavigate();

  const expenses = useExpenseStore((state) => state.expenses);
  const updateExpense = useExpenseStore((state) => state.updateExpense);
  const getAllExpenses = useExpenseStore((state) => state.getAllExpenses);
  const isLoadedExpense = useExpenseStore((state) => state.isLoadedExpense);

  const categories = useCategoryStore((state) => state.categories);
  const getAllCategories = useCategoryStore((state) => state.getAllCategories);
  const isLoadedCategory = useCategoryStore((state) => state.isLoadedCategory);

  const budgets = useBudgetStore((state) => state.budgets);

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    categoryId: ""
  });

  const [currentData, setCurrentData] = useState({
    amount: "",
    categoryId: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [pendingExpense, setPendingExpense] = useState<IExpense | null>(null);

  const expenseToEdit = expenses.find((expense) => expense.id === Number(id));

  useEffect(() => {
    selectRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isLoadedExpense || !isLoadedCategory) {
      if (!isLoadedExpense) getAllExpenses();
      if (!isLoadedCategory) getAllCategories();
    }
  }, [isLoadedExpense, isLoadedCategory]);

  // Mettre à jour le formulaire avec les données de la dépense à éditer
  useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        amount: `${expenseToEdit.amount}`,
        description: expenseToEdit.description,
        date: new Date(expenseToEdit.date).toISOString().split("T")[0],
        categoryId: `${expenseToEdit.category_id}`
      });
    }
  }, [expenseToEdit]);

  useEffect(() => {
    if (expenseToEdit) {
      setCurrentData({
        amount: `${expenseToEdit.amount}`,
        categoryId: `${expenseToEdit.category_id}`
      });
    }
  }, [expenseToEdit]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedExpense: IExpense = {
      id: Number(id),
      amount: Number(formData.amount),
      description: formData.description,
      date: new Date(formData.date).toISOString().split("T")[0],
      category_id: Number(formData.categoryId)
    };

    if (!id) return;

    const categoryId = Number(formData.categoryId);
    const budget = budgets.find((b) => b.category_id === categoryId);

    const hasAmountChanged = formData.amount !== currentData.amount;
    const hasCategoryChanged = formData.categoryId !== currentData.categoryId;
    
    if (!hasAmountChanged && !hasCategoryChanged) {
      updateExpense(updatedExpense.id, updatedExpense);
      navigate(-1);
      return;
    }

    if (budget) {
      const otherExpenses = useExpenseStore
        .getState()
        .expenses.filter(
          (e) => e.category_id === categoryId && e.id !== Number(id)
        );

      const totalWithoutTargetExpense = otherExpenses.reduce(
        (sum, e) => sum + Number(e.amount),
        0
      );

      const newTotal = totalWithoutTargetExpense + Number(formData.amount);

      if (budget.alert && newTotal >= budget.alert) {
        setPendingExpense(updatedExpense);
        setShowModal(true); // Afficher la modale
        return;
      }

      updateExpense(updatedExpense.id, updatedExpense);
      navigate(-1);
    }

    // if (budget){
    //   // Toutes les dépenses sauf celle qu’on modifie
    //   const otherExpenses = useExpenseStore
    //     .getState()
    //     .expenses.filter(
    //       (e) => e.category_id === categoryId && e.id !== Number(id)
    //     );

    //   const totalWithoutTargetExpense = otherExpenses.reduce(
    //     (sum, e) => sum + Number(e.amount),
    //     0
    //   );
    //   const newTotal = Number(totalWithoutTargetExpense) + Number(formData.amount);

    //   if (budget.alert && newTotal >= budget.alert) {
    //     setPendingExpense(updatedExpense);
    //     setShowModal(true); // Afficher la modale
    //     return;
    //   }

    //   updateExpense(updatedExpense.id, updatedExpense);
    //   navigate(-1);
    // }
    if (!budget) {
      updateExpense(Number(id), updatedExpense);
      navigate(-1);
    }
  };

  const handleConfirmExpense = () => {
    if (!pendingExpense) return;

    updateExpense(pendingExpense.id, pendingExpense);
    setPendingExpense(null);
    setShowModal(false);
    navigate(-1);
  };

  const handleCancelExpense = () => {
    setPendingExpense(null);
    setShowModal(false);
  };

  if (!expenseToEdit) return <p>Dépense non trouvée.</p>;

  return (
    <main className="container">
      
        <h2 className="title">Modifier la dépense</h2>
        <div className="box box-custom-form">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="category">
                Catégorie
              </label>
              <div className="control">
                <select
                  id="category"
                  name="categoryId"
                  className="select"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    -- Choisir une catégorie --
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="description">
                Description
              </label>
              <div className="control">
                <input
                  name="description"
                  type="text"
                  className="input"
                  value={formData.description}
                  onChange={handleChange}
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
                  type="number"
                  className="input"
                  value={formData.amount}
                  onChange={handleChange}
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
                  type="date"
                  className="input"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" type="submit">
                  Enregistrer
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
