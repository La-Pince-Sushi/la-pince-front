import { AppRoutes } from "./router/AppRoutes";
import { useEffect, useRef } from "react";
import { useAuthStore } from "./store/authStore.ts";
import "./styles/_forms.scss";
import "./styles/Tables.scss";

export function App() {

  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);
  const hasMountedOnce = useRef(false);

  useEffect(() => {
    if (!hasMountedOnce.current) return void (hasMountedOnce.current = true);
    checkAuth(); // Appelle checkAuth directement
  }, [checkAuth]);

  if (isLoading || !isAuthChecked) {
    return <div>Chargement de l'application...</div>; // Loader global
  }

  return <AppRoutes />;
}