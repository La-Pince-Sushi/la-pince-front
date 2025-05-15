import { create } from "zustand";
import { createSelectors } from "../utils/createSelectors";
import { IBudget, IStoreError, TBudgets } from "../types";
import { addNewBudget, deleteBudget, getAllBudgets, updateBudget } from "../services/budgetServices";
import { useCategoryStore } from "./categoryStore.ts";
import { parseStoreError } from "../utils/parseStoreError.ts";
import { logStoreError } from "../utils/logStoreError.ts";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils.tsx";

export interface IBudgetState {
  budgets: TBudgets;
  error: IStoreError | null
  isLoadedBudget: boolean;
  getAllBudgets: () => Promise<void>;
  clearBudgetState: () => void;
  addNewBudget: (data: IBudget) => Promise<void>;
  updateBudget: (budgetId: string | number, data: IBudget) => Promise<void>;
  deleteBudget: (budgetId: string | number) => Promise<void>;
}

const useBudgetStoreBase = create<IBudgetState>()((set, get) => ({
  budgets: [],
  error: null,
  isLoadedBudget: false,

  clearBudgetState: () => set({ budgets: [], isLoadedBudget: false ,error: null }),

  getAllBudgets: async () => {
    try {
      if (get().isLoadedBudget) return;
      const budgets = await getAllBudgets();
      set({ budgets: budgets, error: null, isLoadedBudget: true });
    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError);
      set({ error: parsedError });
    }
  },

  addNewBudget: async (data) => {
    try {
      const response = await addNewBudget(data);
      const categories = useCategoryStore.getState().categories;
      const category = categories.find(category => category.id === Number(response.category_id));
      const createdBudget = { ...response, category: category ? { name: category.name } : null };
      set((state) => ({ budgets: [...state.budgets, createdBudget], error: null }));
      showSuccessToast("Budget ajouté avec succès !");
    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError);
      set({ error: parsedError });
    }
  },

  updateBudget: async (budgetId, data) => {
    try {
      const response = await updateBudget(budgetId, data);
      const categories = useCategoryStore.getState().categories;
      const category = categories.find(category => category.id === Number(response.category_id));
      const updatedBudget = { ...response, category: category ? { name: category.name } : null };
      set((state) => ({ budgets: state.budgets.map((budget) => budget.id === budgetId ? updatedBudget : budget), error: null }));
      showSuccessToast("Budget mis à jour avec succès !");
    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError);
      set({ error: parsedError });
    }
  },

  deleteBudget: async (budgetId) => {
    try {
      await deleteBudget(budgetId);
      set((state) => ({
        budgets: state.budgets.filter((budget) => budget.id !== budgetId), error: null
      }));
      showSuccessToast("Budget supprimé avec succès !");
    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError);
      set({ error: parsedError });
    }
  }
}));

export const useBudgetStore = createSelectors(useBudgetStoreBase)