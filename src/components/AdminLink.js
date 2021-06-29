import React from "react";
import { Link } from "react-router-dom";

export const AdminLink = () => {
  return (
    <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
      Panel administracyjny
    </Link>
  );
};
