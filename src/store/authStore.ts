import { create } from "zustand";
import { loginRequest, refreshTokenRequest, registerRequest } from "../services/authServices.ts";
import { IAuthStore } from "../types/index";
import { parseStoreError } from "../utils/parseStoreError.ts";
import { logStoreError } from "../utils/logStoreError.ts";
import { showErrorToast, showInfoToast, showSuccessToast } from "../utils/toastUtils.tsx";
import { useUserStore } from "./userStore.ts";
import { clearAccessToken, clearRefreshToken, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "../utils/jwtUtils.ts";
import { useBudgetStore } from "./budgetStore.ts";
import { useExpenseStore } from "./expensesStore.ts";

export const useAuthStore = create<IAuthStore>((set) => ({
  token: getAccessToken(),
  refreshToken: getRefreshToken(),
  error: null,
  isLoading: false,
  isAuthChecked: false,

  clearTokenState: () => {
    set({ token: null, error: null });
  },

  async checkAuth() {
    set({ isLoading: true, isAuthChecked: false });
    try {
      const token = getAccessToken();
      if (!token) {
        console.warn("Aucun utilisateur authentifié.");
        return;
      }
      set({ token });
      await useUserStore.getState().getProfile();
    } catch (error) {
      console.error("Erreur lors de la vérification de l'authentification :", error);
      clearAccessToken();
      set({ token: null });
    } finally {
      set({ isLoading: false, isAuthChecked: true });
    }
  },

  async register(email, password) {
    try {
      const response = await registerRequest(email, password);
      showSuccessToast(response.message || "Inscription réussie !");
      return true;
    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError, { autoClose: 7000 });
      set({ error: parsedError });
    }
  },

  async login(email, password) {
    set({ isLoading: true });
    try {
      const response = await loginRequest(email, password);
      const { accessToken, refreshToken, user } = response;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      set({ token: accessToken });
      useUserStore.getState().setUser(user);
      showSuccessToast("Connexion réussie !");
    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      showErrorToast(parsedError);
      set({ error: parsedError });
    } finally {
      set({ isLoading: false });
    }
  },

  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = getRefreshToken();

    if (!refreshToken) return null;

    try {
      const response = await refreshTokenRequest(refreshToken);
      const { accessToken } = response;
      setAccessToken(accessToken);
      set({ token: accessToken });
      return accessToken;
    } catch (error) {
      const parsedError = parseStoreError(error);
      logStoreError(parsedError);
      this.logout();
      return null;
    }
  },

  logout() {
    clearAccessToken();
    clearRefreshToken();
    useUserStore.getState().clearUserState();
    useBudgetStore.getState().clearBudgetState();
    useExpenseStore.getState().clearExpenseState();
    set({ token: null, error: null });
    showInfoToast("Vous avez été déconnecté.");
  },
}));