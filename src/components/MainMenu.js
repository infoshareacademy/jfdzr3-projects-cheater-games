import React from "react";
import { Logout } from "../auth/Logout";
import { Link } from "react-router-dom";

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
        <li>
          <Link
            to="/store" style={{ textDecoration: "none", color: "inherit" }}>
            Rynek
          </Link>
        </li>
        <li>
          <Link to="/hunt" style={{ textDecoration: "none", color: "inherit" }}>
            Idź na polowanie
          </Link>
        </li>
      </ul>
    </nav>
  );
};
