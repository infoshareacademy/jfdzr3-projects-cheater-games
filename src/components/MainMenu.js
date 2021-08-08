import { Links } from "./Links";
import { Logo } from "./Logo";

export const MainMenu = () => {
  return (
    <nav className="nav">
      <Logo />
      <ul className="navigation__list">
        <Links />
      </ul>
    </nav>
  );
};
