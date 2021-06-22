import "../auth/auth.css";
import React from "react";
import { useUser } from "../hooks/useUser";

export const HomePage = () => {
  const user = useUser();

  return (
    <>
      <h1 className="welcome">Witaj w grze {user.name}</h1>
    </>
  );
};
