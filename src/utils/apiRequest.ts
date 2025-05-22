import { useAuthStore } from "../store/authStore.ts";
import { THttpMethods } from "../types/index";
import { getAccessToken, getRefreshToken } from "../utils/jwtUtils.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Performs an API request with token management and error handling.
 * 
 * @template T - The type of the expected response data.
 * @param {string} endpoint - The relative URL of the API.
 * @param {THttpMethods} [method="GET"] - The HTTP method (GET, POST, etc.).
 * @param {T | null} [data=null] - The data to send in the request body.
 * @returns {Promise<T>} - The result of the request as a promise.
 * @throws {any} - Throws an error if the request fails.
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
      token = newAccessToken;
      response = await fetch(`${BASE_URL}${endpoint}`, buildOptions(token));
      result = await response.json();
    }

    if (!response.ok) throw result;
  }

  if (!response.ok) throw result;

  return result;
}