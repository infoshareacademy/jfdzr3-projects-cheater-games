import { Links } from "./Links";

import s from 'styled-components'

const Logo = s.img`
  width: 80%;
  display: block;
  margin: 0 auto;
  padding-bottom: 20px;
`

export const MainMenu = () => {
  return (
    <nav className="nav">
      <Logo src={`${process.env.PUBLIC_URL}/logo-monster-hunt.png`} alt="" />
      <ul className="navigation__list">
        <Links />
      </ul>
    </nav>
  );
};
