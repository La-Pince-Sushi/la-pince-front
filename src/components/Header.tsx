import { LogoLink } from "./common/LogoLink";
import "./Header.scss";

export default function Header({hasSidebar = false}) {
  return (
    <header className="header p-2">
      <div className={`${hasSidebar ?'with-sidebar' : 'header-container'}`}>
        <div className="logo">
          <LogoLink />
        </div>
      </div>
    </header>
  );
}
