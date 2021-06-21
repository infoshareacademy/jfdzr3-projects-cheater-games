import React from "react";
import "../auth/auth.css";
import { Login } from "../auth/Login";

export const LoginPage = () => (
  <div className="content">
    <nav className="nav"></nav>
    <main className="main__section">
      <Login />
    </main>
    <aside className="advertising"></aside>
  </div>
);
