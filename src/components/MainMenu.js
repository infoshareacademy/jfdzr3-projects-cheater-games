import React from "react";
import { Logout } from "../auth/Logout";
import { Link } from "react-router-dom";
import { GlobalChat } from "../global-chat/global-chat";

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
        <li>
          <Link to="/hunt" style={{ textDecoration: "none", color: "inherit" }}>
            Idź na polowanie
          </Link>
        </li>
      </ul>
      <GlobalChat/>
    </nav>
  );
};
