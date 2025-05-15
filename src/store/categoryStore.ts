import { create } from "zustand";
import { getAllCategories } from "../services/categoryService.ts";
import { IStoreError, TCategories } from "../types/index";
import { parseStoreError } from "../utils/parseStoreError.ts";
import { logStoreError } from "../utils/logStoreError.ts";
import { showErrorToast } from "../utils/toastUtils.tsx";

export interface ICategoryState {
  categories: TCategories;
  error: IStoreError | null
  isLoadedCategory: boolean;
  getAllCategories: () => Promise<void>;
}

export const useCategoryStore = create<ICategoryState>((set, get) => ({
  categories: [],
  error: null,
  isLoadedCategory: false,

  getAllCategories: async () => {

    try {
      if (get().isLoadedCategory) return;
      const categories = await getAllCategories();
      set({ categories, error: null, isLoadedCategory: true });
    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError);
      set({ error: parsedError });
    }
  }
}))

