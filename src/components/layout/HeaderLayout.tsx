import Footer from "../Footer";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import "./HeaderLayout.scss";

export default function HeaderLayout() {
  return (
    <div className="public-layout">
      <div className="header-public">
        <Header />
      </div>
      <main className="main-public">
        <Outlet />
      </main>
      <div className="footer-public">
        <Footer />
      </div>      
    </div>
  );
}