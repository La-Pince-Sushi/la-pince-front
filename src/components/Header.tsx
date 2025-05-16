import { LogoLink } from "./common/LogoLink";


export default function Header() {
  return (
    <header className="header p-2">
      <div className="logo">
        <LogoLink />
      </div>
    </header>
  );
}
