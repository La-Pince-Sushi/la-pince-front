/**
 * Stores the access JWT token in localStorage.
 * 
 * @param {string} token - The access JWT token to store.
 */
export function setAccessToken(token: string) {
  if (token) {
    localStorage.setItem("jwt_access_token", token);
  }
}

/**
 * Retrieves the access JWT token stored in localStorage.
 * 
 * @returns {string|null} - The access JWT token or null if not found.
 */
export function getAccessToken(): string | null {
  return localStorage.getItem("jwt_access_token");
}

/**
 * Removes the access JWT token from localStorage.
 */
export function clearAccessToken() {
  localStorage.removeItem("jwt_access_token");
}

/**
 * Stores the refresh JWT token in localStorage.
 * 
 * @param {string} token - The refresh JWT token to store.
 */
export function setRefreshToken(token: string) {
  if (token) {
    localStorage.setItem("jwt_refresh_token", token);
  }
}

/**
 * Retrieves the refresh JWT token stored in localStorage.
 * 
 * @returns {string|null} - The refresh JWT token or null if not found.
 */
export function getRefreshToken(): string | null {
  return localStorage.getItem("jwt_refresh_token");
}

/**
 * Removes the refresh JWT token from localStorage.
 */
export function clearRefreshToken() {
  localStorage.removeItem("jwt_refresh_token");
}
