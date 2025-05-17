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
  clearTokenState: () => { set({ token: null }) },
  error: null,

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

  async checkAuth() {
    const token = getAccessToken();
    if (!token) return;
    set({ token });

    try {
      await useUserStore.getState().getProfile();
    } catch (error) {
      clearAccessToken();
      set({ token: null });
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