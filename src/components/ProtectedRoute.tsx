import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore.ts";

export const ProtectedRoute = () => {
  const isAuthChecked = useAuthStore(state => state.isAuthChecked);
  const token = useAuthStore(state => state.token);
  const user = useUserStore(state => state.user);

  // Attendre que l'authentification soit vérifiée
  if (!isAuthChecked) {
    return <div>Chargement...</div>;
  }

  // Si l'utilisateur n'est pas authentifié, redirige vers /signin
  if (!token || !user?.email) {
    return <Navigate to="/signin" replace />;
  }
  // Sinon, rend les routes enfants
  return <Outlet />;
};