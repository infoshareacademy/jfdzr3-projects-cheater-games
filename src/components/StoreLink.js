import React from "react";
import { Link } from "react-router-dom";

export const StoreLink = () => {
  return (
    <Link to="/store" style={{ textDecoration: "none", color: "inherit" }}>
      Rynek
    </Link>
  );
};