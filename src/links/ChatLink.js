import React from "react";
import { Link } from "react-router-dom";

export const ChatLink = () => {
  return (
    <Link to="/chat" style={{ textDecoration: "none", color: "inherit" }}>
      Chat
    </Link>
  );
};
