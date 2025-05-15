import { useAuthStore } from "../store/authStore.ts";
import { THttpMethods } from "../types/index";
import { getAccessToken, getRefreshToken } from "../utils/jwtUtils.ts";

const BASE_URL = "https://la-pince-back-production.up.railway.app/";

/**
 * Utility function to make any API request.
 * It handles methods, body, headers, auth token, and throw errors.
 */
export async function apiRequest<T>(endpoint: string, method: THttpMethods = "GET", data: T | null = null): Promise<T> {

  let token = getAccessToken();
  const refreshToken = getRefreshToken();

  const buildOptions = (token: string | null): RequestInit => ({
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
  });

  // Envoi de la requête à l'API
  let response = await fetch(`${BASE_URL}${endpoint}`, buildOptions(token));
  let result = await response.json();

  // Si le token est expiré, on essaie de le rafraîchir
  if (response.status === 401 && refreshToken) {
    const newAccessToken = await useAuthStore.getState().refreshAccessToken();
    if (newAccessToken) {
      console.log("🔄 Nouveau token obtenu");
      token = newAccessToken;
      response = await fetch(`${BASE_URL}${endpoint}`, buildOptions(token));
      result = await response.json();
    }

    if (!response.ok) throw result;
  }

  if (!response.ok) throw result;

  return result;
}