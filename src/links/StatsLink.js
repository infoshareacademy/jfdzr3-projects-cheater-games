import React from "react";
import { Link } from "react-router-dom";

export const StatsLink = () => {
  return (
    <Link to="/stats" style={{ textDecoration: "none", color: "inherit" }}>
      Statystyki
    </Link>
  );
};
