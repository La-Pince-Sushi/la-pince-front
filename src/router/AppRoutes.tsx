import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { ExpensesAddForm } from "../pages/expenses/ExpensesAddForm.tsx";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { EmailForm } from "../pages/profile/EmailForm";
import { ExpensesEditForm } from "../pages/expenses/ExpensesEditForm";
import { PasswordForm } from "../pages/profile/PasswordForm";
import { BudgetAddForm } from "../pages/budgets/BudgetAddForm.tsx";
import { BudgetEditForm } from "../pages/budgets/BudgetEditForm";
import { BudgetsTable } from "../pages/budgets/BudgetTable";
import { ExpensesTable } from "../pages/expenses/ExpensesTable.tsx";
import HeaderLayout from "../components/layout/HeaderLayout.tsx";
import SidebarLayout from "../components/layout/SidebarLayout.tsx";
import { ProtectedRoute } from "../components/ProtectedRoute.tsx";
import { RedirectIfAuth } from "../components/RedirectIfAuth.tsx";
import LegalNotice from "../pages/legal/LegalNotice.tsx";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy.tsx";

export const AppRoutes = () => {

  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        {/* Mentions légales et politique de confidentialité accessibles à tous */}
        <Route path="/legal-notice" element={<LegalNotice />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Route>

      {/* HEADER LAYOUT */}
      {/* Page d'accueil */}
      <Route element={<RedirectIfAuth />}>
        <Route element={<HeaderLayout />}>
          <Route index element={<Home />} />
        
        {/* SANS LAYOUT */}
        {/* Connexion et inscription */}
          <Route path="signin" element={<LoginPage />} />
          <Route path="signup" element={<RegisterPage />} />
        </Route>
      </Route>


      {/* SIDEBAR LAYOUT */}
      <Route element={<ProtectedRoute />}>
        <Route element={<SidebarLayout />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Dépenses */}
          <Route path="/expenses" element={<ExpensesTable />} />
          <Route path="/expenses/add" element={<ExpensesAddForm />} />
          <Route path="/expenses/edit/:id" element={<ExpensesEditForm />} />
          {/* Budgets */}
          <Route path="/budgets" element={<BudgetsTable />} />
          <Route path="/budgets/edit/:id" element={<BudgetEditForm />} />
          <Route path="/budgets/add" element={<BudgetAddForm />} />
          {/* Profil */}
          <Route path="/profile" element={<ProfilePage />} />
          {/* Modification de profil */}
          <Route path="/profile/email" element={<EmailForm />} />
          <Route path="/profile/password" element={<PasswordForm />} />
          <Route path="/profile/legal-notice" element={<LegalNotice />} />
          <Route path="/profile/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Route>

      {/* Redirection vers la page d'accueil si aucune route ne correspond */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

