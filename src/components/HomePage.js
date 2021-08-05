import "../auth/auth.css";
import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { SelectRace } from "./SelectRace";
import { GlobalChat } from "../global-chat/global-chat";
import { Login } from "../auth/Login";

export const HomePage = () => {
  const user = useUser();
  
  return (
    <>
      {user !== null ? (
        <>
          <h1 className="welcome">Witaj w grze {user.name}</h1>

          {user.race === undefined ? <SelectRace /> : <GlobalChat />}
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
};
