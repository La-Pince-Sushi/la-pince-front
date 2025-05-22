import { apiRequest } from "../utils/apiRequest.ts";

/**
 * Sends a registration request to the API.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<any>} - The API response.
 */
export function registerRequest(email: string, password: string) {
  return apiRequest<any>("auth/register", "POST", { email, password });
}

/**
 * Sends a login request to the API.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<any>} - The API response containing authentication tokens.
 */
export function loginRequest(email: string, password: string) {
  return apiRequest<any>("auth/login", "POST", { email, password });
}

/**
 * Sends a refresh token request to the API.
 * 
 * @param {string} refreshToken - The refresh token to renew the access token.
 * @returns {Promise<any>} - The API response containing a new access token.
 */
export function refreshTokenRequest(refreshToken: string) {
  return apiRequest<any>("auth/refresh", "POST", { refreshToken });
}
