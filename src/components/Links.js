import React from "react";
import { Logout } from "../auth/Logout";
import { useUser } from "../hooks/useUser";
import { HuntLink } from "./HuntLink";
import { AdminLink } from "./AdminLink";

export const Links = () => {
  const user = useUser();

  const adminLinks = [
    <AdminLink />,
    "Widok postaci",
    "Statystyki",
    <HuntLink />,
    "Rynek",
    <Logout />,
  ];

  const userLinks = [
    "Widok postaci",
    "Statystyki",
    <HuntLink />,
    "Rynek",
    <Logout />,
  ];

  if (user?.role === "admin") {
    return adminLinks.map((el, i) => {
      return <li key={i}>{el}</li>;
    });
  } else if (user?.role === "player" && user?.race !== undefined) {
    return userLinks.map((el, i) => {
      return <li key={i}>{el}</li>;
    });
  } else if (user?.role === "player" && user?.race === undefined) {
    return (
      <li>
        <Logout />
      </li>
    );
  }
  return (
    <li>
      <Logout />
    </li>
  );
};
