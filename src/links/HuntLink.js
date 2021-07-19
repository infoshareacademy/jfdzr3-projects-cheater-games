import React from "react";
import { Link } from "react-router-dom";

export const HuntLink = () => {
  return (
    <Link to="/hunt" style={{ textDecoration: "none", color: "inherit" }}>
      Idź na polowanie
    </Link>
  );
};
