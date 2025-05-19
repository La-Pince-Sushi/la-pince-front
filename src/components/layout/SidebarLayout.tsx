import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./SidebarLayout.scss";

export default function SidebarLayout() {
  return (
    <div className="layout">
      <div className="header-box">
        <Header hasSidebar />
      </div>      
      <main className="main">
        <div className="content">
          <Outlet />
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
      </main>
    </div>
  );
}
