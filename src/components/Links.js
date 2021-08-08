import React from "react";
import { Logout } from "../auth/Logout";
import { useUser } from "../hooks/useUser";
import { HuntLink } from "../links/HuntLink";
import { AdminLink } from "../links/AdminLink";
import { StatsLink } from "../links/StatsLink";
import { CharacterViewLink } from "../links/CharacterViewLink";
import { StoreLink } from "../links/StoreLink";
import { ChatLink } from "../links/ChatLink";
import { AboutUsLink } from "../links/AboutUsLink";

export const Links = () => {
  const user = useUser();

  const userLinks = [
    <CharacterViewLink />,
    <StatsLink />,
    <HuntLink />,
    <StoreLink />,
    <ChatLink />,
    <Logout />,
    <AboutUsLink />,
  ];

  const adminLinks = [<AdminLink />, ...userLinks];

  if (user?.role === "admin") {
    return adminLinks.map((el, i) => (
      <li className="navigation__item" key={i}>
        {el}
      </li>
    ));
  }
  if (user?.role === "player" && user?.race !== undefined) {
    return userLinks.map((el, i) => (
      <li className="navigation__item" key={i}>
        {el}
      </li>
    ));
  }
  if (user?.role === "player" && user?.race === undefined) {
    return (
      <li>
        <Logout />
      </li>
    );
  }
  return null;
};
