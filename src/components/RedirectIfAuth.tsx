// src/components/RedirectIfAuth.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore.ts";

export const RedirectIfAuth = () => {
  const isAuthChecked = useAuthStore(state => state.isAuthChecked);
  const token = useAuthStore(state => state.token);
  const user = useUserStore(state => state.user);

  // Attendre que l'authentification soit vérifiée
  if (!isAuthChecked) {
    return <div>Chargement...</div>;
  }

  // Si l'utilisateur est déjà connecté, on redirige vers /dashboard
  if (token && user?.email) {
    return <Navigate to="/dashboard" replace />;
  }
  // Sinon on affiche les routes enfants (/ ou /signin ou /signup)
  return <Outlet />;
};
