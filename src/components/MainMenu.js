import React from "react";
import { Logout } from "../auth/Logout";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { HuntLink } from "./HuntLink";
import { AdminLink } from "./AdminLink";
import { link } from "fs-extra";

export const MainMenu = () => {
  const user = useUser();

  const links = [
    <AdminLink />,
    "Widok postaci",
    "Statystyki",
    <HuntLink />,
    "Rynek",
    <Logout />,
  ];

  const renderMenu = () => {
    if (user?.role === "admin") {
      links.map((el) => {
        return <li>{el}</li>;
      });
    } else if (user?.role === "player") {
      links.map((el, i) => {
        if (i > 0) {
          return <li>{el}</li>;
        }
      });
    } else if (user?.role === "player" && user?.race === undefined) {
      return <li>{links[links.length - 1]}</li>;
    }
  };

  return (
    <nav className="nav">
      <ul>
        {renderMenu}
        {/* <li>
          <Logout />
        </li>
        {user !== null && user?.race !== undefined ? (
          <>
            <li>Widok postaci</li>
            <li>Statystyki</li>
            <li>Quest</li>
            <li>Rynek</li>
            <li>
              <Link
                to="/hunt"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Idź na polowanie
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
        {user?.role === "admin" ? (
          <li>
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Panel administracyjny
            </Link>
          </li>
        ) : (
          <> </>
        )} */}
      </ul>
    </nav>
  );
};
