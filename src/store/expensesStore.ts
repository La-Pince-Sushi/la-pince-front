import { create } from "zustand";
import { IExpense, IStoreError, TExpenses } from "../types";
import { addNewExpense, deleteExpense, getAllExpenses, updateExpense } from "../services/expenseService";
import { createSelectors } from "../utils/createSelectors";
import { useCategoryStore } from "./categoryStore.ts";
import { parseStoreError } from "../utils/parseStoreError.ts";
import { logStoreError } from "../utils/logStoreError.ts";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils.tsx";

export interface IExpenseState {
  expenses: TExpenses;
  error: IStoreError | null
  isLoadedExpense: boolean;
  clearError: () => void;
  getAllExpenses: () => Promise<void>;
  clearExpenseState: () => void;
  addNewExpense: (data: IExpense) => Promise<void>;
  updateExpense: (expenseId: string | number, data: IExpense) => Promise<void>;
  deleteExpense: (expenseId: string | number) => void;
}

const useExpenseStoreBase = create<IExpenseState>()((set, get) => ({
  expenses: [],
  isLoadedExpense: false,
  error: null,

  clearExpenseState: () => set({ expenses: [], isLoadedExpense: false, error: null }),

  clearError: () => set({ error: null }),

  getAllExpenses: async () => {
    try {
      if (get().isLoadedExpense) return;
      const expenses = await getAllExpenses();
      set({ expenses, error: null, isLoadedExpense: true });
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
      set((state) => ({ expenses: [...state.expenses, createdExpense], error: null }));
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
      set((state) => ({ expenses: state.expenses.map((expense) => expense.id === expenseId ? updatedExpense : expense), error: null }));
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
      set((state) => ({
        expenses: state.expenses.filter((expense) => expense.id !== expenseId), error: null
      }));
      showSuccessToast("Dépense supprimée avec succès !");
    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError);
      set({ error: parsedError });
    }
  }
}));

export const useExpenseStore = createSelectors(useExpenseStoreBase)