import React from "react";
import { Link } from "react-router-dom";

export const CharacterViewLink = () => {
  return (
    <Link to="/character" style={{ textDecoration: "none", color: "inherit" }}>
      Widok postaci
    </Link>
  );
};
