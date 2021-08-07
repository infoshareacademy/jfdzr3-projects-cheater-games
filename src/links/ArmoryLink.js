import React from "react";
import { Link } from "react-router-dom";

export const ArmoryLink = () => {
  return (
    <Link to="/armory" style={{ textDecoration: "none", color: "inherit" }}>
      Zbrojownia
    </Link>
  );
};