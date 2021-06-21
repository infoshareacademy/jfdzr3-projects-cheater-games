import React from "react";
import "../auth/auth.css";
import { Registration } from "../auth/Registration";

export const RegistrationPage = () => (
  <div className="content">
    <nav className="nav"></nav>
    <main className="main__section">
      <Registration />
    </main>
    <aside className="advertising"></aside>
  </div>
);
