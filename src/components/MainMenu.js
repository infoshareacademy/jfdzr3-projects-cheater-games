import React from "react";
import { Logout } from "../auth/Logout";

export const MainMenu = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Logout />
        </li>
        <li>Widok postaci</li>
        <li>Statystyki</li>
        <li>Quest</li>
        <li>Rynek</li>
        <li>Idź na polowanie</li>
      </ul>
    </nav>
  );
};
