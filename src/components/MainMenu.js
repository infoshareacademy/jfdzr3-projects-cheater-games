import React from "react";
import { Links } from "./Links"
import { Logout } from "../auth/Logout";
import { Link } from "react-router-dom";
import { GlobalChat } from "../global-chat/global-chat";


export const MainMenu = () => {

  return (
    <nav className="nav">
      <ul>
        <Links />
      </ul>
      <GlobalChat/>
    </nav>
  );
};
