import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.ts";
import './Sidebar.scss';
import SavingsIcon from '@mui/icons-material/Savings';
import HomeIcon from '@mui/icons-material/Home';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const menuItems = [
  { id: "dashboard", label: (<><HomeIcon className="icon" />Tableau de bord</>), path: "/dashboard" },
  { id: "budgets", label: (<><SavingsIcon className="icon" />Budget</>), path: "/budgets" },
  { id: "expenses", label: (<><TrendingDownIcon className="icon" />Dépenses</>), path: "/expenses" },
  { id: "profile", label: (<><AccountCircleIcon className="icon" />Profil</>), path: "/profile" },
  { id: "logout", label: (<><LogoutIcon className="icon" />Déconnexion</>), onClick: true },
];

export default function Sidebar() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <aside className="menu custom-sidebar">
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.id}>
            {item.onClick ? (
              <button
                className="sidebar-logout-btn"
                onClick={handleLogout}
              >
                {item.label}
              </button>
            ) : (
              item.path && ( // Vérification que item.path est défini
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
  );
}
