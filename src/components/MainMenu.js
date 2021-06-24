import React from "react";
import { Logout } from "../auth/Logout";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export const MainMenu = () => {
  const user = useUser();

  return (
    <nav className="nav">
      <ul>
        <li>
          <Logout />
        </li>
        {user !== null && user?.race !== undefined ? (
          <>
        <li>Widok postaci</li>
        <li>Statystyki</li>
        <li>Quest</li>
        <li>Rynek</li>
        <li>
          <Link to="/hunt" style={{ textDecoration: "none", color: "inherit" }}>
            Idź na polowanie
          </Link>
        </li> 
        </>
        ) : (
          <li></li>
        )}
      </ul>
    </nav>
  );
};
