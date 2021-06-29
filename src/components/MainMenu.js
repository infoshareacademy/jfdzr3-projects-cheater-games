import React from "react";
import { Links } from "./Links"


export const MainMenu = () => {

  return (
    <nav className="nav">
      <ul>
        <Links />
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
