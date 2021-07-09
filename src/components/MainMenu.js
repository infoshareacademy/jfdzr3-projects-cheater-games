import React from "react";
import { Links } from "./Links"
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
