import React from "react";
import { Links } from "./Links";
import { Logout } from "../auth/Logout";
import { Link } from "react-router-dom";

export const MainMenu = () => {
  return (
    <nav className="nav">
      <ul>
        <Links />
      </ul>
    </nav>
  );
};
