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
    if (!hasMountedOnce.current) {
      hasMountedOnce.current = true;
      checkAuth();
    }
  }, [checkAuth]);

  if (isLoading) {
    return <div>Chargement de l'application...</div>;
  }

  if (!isAuthChecked) {
    return <div>Vérification de l'authentification...</div>;
  }

  return <AppRoutes />;
}