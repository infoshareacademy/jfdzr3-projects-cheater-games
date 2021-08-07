import React from "react";
import { Logout } from "../auth/Logout";
import { useUser } from "../hooks/useUser";
import { HuntLink } from "../links/HuntLink";
import { AdminLink } from "../links/AdminLink"
import { StatsLink } from "../links/StatsLink";
import { CharacterViewLink } from "../links/CharacterViewLink";
import { StoreLink } from "../links/StoreLink";
import { AboutUsLink } from "../links/AboutUsLink";
import { ArmoryLink } from "../links/ArmoryLink";

export const Links = () => {
  const user = useUser();

  const adminLinks = [
    <AdminLink />,
    <CharacterViewLink />,
    <StatsLink />,
    <HuntLink />,
    <ArmoryLink />,
    <StoreLink />,
    <AboutUsLink/>,
    <Logout />,
  ];

  const userLinks = [
    <CharacterViewLink />,
    <StatsLink />,
    <HuntLink />,
    <ArmoryLink />,
    <StoreLink />,
    <AboutUsLink/>,
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
  return null;
};
