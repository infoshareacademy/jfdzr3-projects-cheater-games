import React from "react";
import { Link } from "react-router-dom";

export const CartPageLink = () => {
  return (
    <Link to="/koszyk" style={{ textDecoration: "none", color: "inherit" }}>
      Koszyk
    </Link>
  );
};
