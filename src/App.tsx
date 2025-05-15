import { AppRoutes } from "./router/AppRoutes";
import { useEffect, useRef } from "react";
import { useAuthStore } from "./store/authStore.ts";
import { getAccessToken } from "./utils/jwtUtils.ts";
import "./styles/_forms.scss";


export function App() {

  const { checkAuth } = useAuthStore();
  const hasMountedOnce = useRef(false);

  useEffect(() => {
    // Si composant a déjà été monté, on ne fait rien, sinon, état mis à jour pour indiquer qu'il a été monté
    if (!hasMountedOnce.current) return void (hasMountedOnce.current = true);
    // On vérifie le token est présent dans le localStorage
    const token = getAccessToken();
    // Si le token est présent, on appelle la fonction checkAuth
    if (token) checkAuth();
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  )
}