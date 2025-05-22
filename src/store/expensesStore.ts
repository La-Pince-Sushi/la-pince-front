import { create } from "zustand";
import { IExpense, IStoreError, TExpenses } from "../types";
import { addNewExpense, deleteExpense, getAllExpenses, updateExpense } from "../services/expenseService";
import { createSelectors } from "../utils/createSelectors";
import { useCategoryStore } from "./categoryStore.ts";
import { parseStoreError } from "../utils/parseStoreError.ts";
import { logStoreError } from "../utils/logStoreError.ts";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils.tsx";
import { filterExpensesByMonth, handleUniqueMonth } from "../utils/parseExpenses.ts";
import { ALL_MONTHS } from "../constant/constant.ts";


export interface IExpenseState {
  expenses: TExpenses;
  filteredExpenses: TExpenses;
  error: IStoreError | null
  isLoadedExpense: boolean;
  monthSelected: string;
  availableMonths: string[];


  setMonthSelected: (month: string) => void;
  clearError: () => void;
  getAllExpenses: () => Promise<void>;
  clearExpenseState: () => void;
  addNewExpense: (data: IExpense) => Promise<void>;
  updateExpense: (expenseId: string | number, data: IExpense) => Promise<void>;
  deleteExpense: (expenseId: string | number) => void;
}

const useExpenseStoreBase = create<IExpenseState>()((set, get) => ({
  expenses: [],
  filteredExpenses: [],
  isLoadedExpense: false,
  error: null,
  monthSelected: ALL_MONTHS,
  availableMonths: [],
  
  setMonthSelected: (month) => {
    const expenses = get().expenses;
    const filtered = filterExpensesByMonth(expenses, month);
    
    // Si un mois spécifique est sélectionné, mais qu'il n'y a pas de dépenses pour ce mois,
    // on revient automatiquement à "all"
    if (month !== ALL_MONTHS && filtered.length === 0) {
      // Pas de dépenses pour ce mois, on revient à "all"
      set({monthSelected: ALL_MONTHS, filteredExpenses: expenses});
    } else {
      // Cas normal
      set({monthSelected: month, filteredExpenses: filtered});
    }
  },

  clearExpenseState: () => set({ expenses: [], isLoadedExpense: false, error: null }),

  clearError: () => set({ error: null }),

  getAllExpenses: async () => {
    try {
      if (get().isLoadedExpense) return;
      const expenses = await getAllExpenses();
      const months = handleUniqueMonth(expenses);
      const month = get().monthSelected;
      const filtered = filterExpensesByMonth(expenses, month);
      set({ expenses, filteredExpenses: filtered, availableMonths: months, error: null, isLoadedExpense: true });
    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError);
      set({ error: parsedError });
    }
  },
  
  addNewExpense: async (data) => {
    try {
      const response = await addNewExpense(data);
      const categories = useCategoryStore.getState().categories;
      const category = categories.find(category => category.id === Number(response.category_id));
      const createdExpense = { ...response, category: category ? { name: category.name } : null };      

      const state = get();
      const updatedExpenses = [...state.expenses, createdExpense];

      const updatedAvailableMonths = handleUniqueMonth(updatedExpenses);
      const updatedFiltered = filterExpensesByMonth(updatedExpenses, state.monthSelected);

      set({ expenses: updatedExpenses, filteredExpenses: updatedFiltered, availableMonths: updatedAvailableMonths, error: null });
      showSuccessToast("Dépense ajoutée avec succès !");

    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError);
      set({ error: parsedError });
    }
  },

  updateExpense: async (expenseId, data) => {
    try {
      const response = await updateExpense(expenseId, data);
      const categories = useCategoryStore.getState().categories;
      const category = categories.find(category => category.id === Number(response.category_id));
      const updatedExpense = { ...response, category: category ? { name: category.name } : null };

      const updatedExpenses = get().expenses.map((expense) => expense.id === expenseId ? updatedExpense: expense);

      const updatedAvailableMonths = handleUniqueMonth(updatedExpenses);
      const updatedFiltered = filterExpensesByMonth(updatedExpenses, get().monthSelected);

      set({ expenses: updatedExpenses, filteredExpenses: updatedFiltered, availableMonths: updatedAvailableMonths, error: null });
      showSuccessToast("Dépense mise à jour avec succès !");

    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError);
      set({ error: parsedError });
    }
  },

  deleteExpense: async (expenseId) => {
    try {
      await deleteExpense(expenseId);

      const updatedExpenses = get().expenses.filter((expense) => expense.id !== expenseId);
      const currentMonth = get().monthSelected;
      const updatedAvailableMonths = handleUniqueMonth(updatedExpenses);
      
      // Vérifier si des dépenses existent encore pour le mois sélectionné
      const filteredForCurrentMonth = filterExpensesByMonth(updatedExpenses, currentMonth);
      
      // Si aucune dépense n'existe plus pour ce mois et qu'il n'est pas "all",
      // réinitialiser à "all"
      if (currentMonth !== ALL_MONTHS && filteredForCurrentMonth.length === 0) {
        set({
          expenses: updatedExpenses, 
          filteredExpenses: updatedExpenses, 
          availableMonths: updatedAvailableMonths, 
          monthSelected: ALL_MONTHS,
          error: null
        });
      } else {
        // Sinon, continuer avec le mois actuellement sélectionné
        const updatedFiltered = filterExpensesByMonth(updatedExpenses, currentMonth);
        set({
          expenses: updatedExpenses, 
          filteredExpenses: updatedFiltered, 
          availableMonths: updatedAvailableMonths, 
          error: null
        });
      }
      
      showSuccessToast("Dépense supprimée avec succès !");
    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError);
      set({ error: parsedError });
    }
  }
}));

export const useExpenseStore = createSelectors(useExpenseStoreBase);