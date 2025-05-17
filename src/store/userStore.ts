import { create } from "zustand";
import { createSelectors } from "../utils/createSelectors";
import { IStoreError, IUser } from "../types";
import { deleteUser, getMe, updateUser } from "../services/userServices";
import { parseStoreError } from "../utils/parseStoreError.ts";
import { logStoreError } from "../utils/logStoreError.ts";
import { showErrorToast, showInfoToast, showSuccessToast } from "../utils/toastUtils.tsx";
import { useAuthStore } from "./authStore.ts";

export interface IUserState {
  user: Partial<IUser> | null
  error: IStoreError | null
  updateUser: (data: Partial<IUser>) => Promise<boolean>
  deleteUser: () => Promise<void>
  setUser: (user: Partial<IUser>) => void
  clearUserState: () => void
  getProfile: () => Promise<void>
}

const useUserStoreBase = create<IUserState>()((set) => ({
  user: null,
  error: null,

  setUser: (user) => set({ user, error: null }),

  clearUserState: () => set({ user: null, error: null }),

  getProfile: async () => {
    try {
      const user = await getMe();
      set({ user, error: null });
    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError);
      set({ error: parsedError });
    }
  },

  updateUser: async (data) => {
    try {
      const updatedUser = await updateUser(data);            
      set({ user: updatedUser, error: null });
      showSuccessToast("Profil mis à jour avec succès !");
      return true;
    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError, { autoClose: 7000 });
      set({ error: parsedError });
      return false;
    }
  },

  deleteUser: async () => {
    try {
      await deleteUser();
      set({ user: null, error: null });
      useAuthStore.getState().clearTokenState();
      showInfoToast("Le compte a bien été supprimé.");
    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError);
      set({ error: parsedError });
    }
  },

}));

export const useUserStore = createSelectors(useUserStoreBase)