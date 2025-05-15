import { apiRequest } from "../utils/apiRequest.ts";

export function registerRequest(email: string, password: string) {
  return apiRequest<any>("auth/register", "POST", { email, password });
}

export function loginRequest(email: string, password: string) {
  return apiRequest<any>("auth/login", "POST", { email, password });
}

export function refreshTokenRequest(refreshToken: string) {
  return apiRequest<any>("auth/refresh", "POST", { refreshToken });
}
