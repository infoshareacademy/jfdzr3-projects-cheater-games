import React from "react";
import { Link } from "react-router-dom";

export const AboutUsLink = () => {
  return (
    <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
      O nas
    </Link>
  );
};