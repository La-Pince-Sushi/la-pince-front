/**
 * Stores the JWT access token in localStorage.
 * @param {string} token - The JWT access token to be stored.
 */
export function setAccessToken(token: string) {
  if (token) {
    localStorage.setItem("jwt_access_token", token);
  }
}

/**
 * Retrieves the stored JWT access token from localStorage.
 * @returns {string|null} - The stored JWT access token or null if not found.
 */
export function getAccessToken(): string | null {
  return localStorage.getItem("jwt_access_token");
}

/**
 * Removes the stored JWT access token from localStorage.
 */
export function clearAccessToken() {
  localStorage.removeItem("jwt_access_token");
}

/**
 * Stores the JWT refresh token in localStorage.
 * @param {string} token - The JWT refresh token to be stored.
 */
export function setRefreshToken(token: string) {
  if (token) {
    localStorage.setItem("jwt_refresh_token", token);
  }
}

/**
 * Retrieves the stored JWT refresh token from localStorage.
 * @returns {string|null} - The stored JWT refresh token or null if not found.
 */
export function getRefreshToken(): string | null {
  return localStorage.getItem("jwt_refresh_token");
}

/**
 * Removes the stored JWT refresh token from localStorage.
 */
export function clearRefreshToken() {
  localStorage.removeItem("jwt_refresh_token");
}
