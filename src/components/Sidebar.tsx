import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.ts";
import './Sidebar.scss';
import SavingsIcon from '@mui/icons-material/Savings';
import HomeIcon from '@mui/icons-material/Home';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react";

const menuItems = [
  { id: "dashboard", label: (<><HomeIcon className="icon" />Tableau de bord</>), path: "/dashboard" },
  { id: "budgets", label: (<><SavingsIcon className="icon" />Budget</>), path: "/budgets" },
  { id: "expenses", label: (<><TrendingDownIcon className="icon" />Dépenses</>), path: "/expenses" },
  { id: "profile", label: (<><AccountCircleIcon className="icon" />Profil</>), path: "/profile" },
  { id: "logout", label: (<><LogoutIcon className="icon" />Déconnexion</>), onClick: true },
];

export default function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowModal(true); // Affiche la modale
  };

  const handleConfirmLogout = () => {
    logout();
    navigate("/signin");
    setShowModal(false); // Ferme la modale
  };

  const handleCancelLogout = () => {
    setShowModal(false); // Ferme la modale sans déconnexion
  };

  return (
    <>
      <aside className="menu custom-sidebar">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.onClick ? (
                <button
                  className="sidebar-logout-btn"
                  onClick={handleLogoutClick}
                >
                  {item.label}
                </button>
              ) : (
                item.path && (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "is-active" : undefined
                    }
                    end={item.path === "/"}
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Modale de confirmation */}
      {showModal && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={handleCancelLogout}
          ></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Confirmation de déconnexion</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleCancelLogout}
              ></button>
            </header>
            <section className="modal-card-body">
              <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
            </section>
            <footer className="modal-card-foot is-justify-content-space-between">
              <button
                className="button is-danger"
                onClick={handleConfirmLogout}
              >
                Oui, déconnecter
              </button>
              <button className="button ml-4" onClick={handleCancelLogout}>
                Annuler
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}