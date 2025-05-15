import logo from "../assets/logo-la-pince.png";

export default function Header() {
  return (
    <header className="header p-2">
      <div className="logo">
        <img src={logo} alt="logo La Pince" />
      </div>
    </header>
  );
}
