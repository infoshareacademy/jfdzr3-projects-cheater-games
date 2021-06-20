import "../auth/auth.css";
import React from "react";
import { Logout } from "../auth/Logout";
import firebase from "firebase/app";
import { Redirect } from "react-router-dom";
import useFirebaseAuthentication from "../auth/useFirebaseAuthentication";
import firebaseApp from "../firebaseConfig";

export const HomePage = () => {
  const authUser = useFirebaseAuthentication(firebase);
  let currentUser = firebaseApp.auth().currentUser;
  console.log(currentUser.displayName);
  // console.log(authUser.displayName);
  return (
    <>
      <div className="content">
        <nav className="nav">
          <ul>
            <Logout />
            <li>Widok postaci</li>
            <li>Statystyki</li>
            <li>Quest</li>
            <li>Rynek</li>
            <li>Idź na polowanie</li>
          </ul>
        </nav>
        <main className="main__section">
          <h1 className="welcome">Witaj w grze {currentUser.displayName}</h1>
        </main>

        <aside className="advertising"></aside>
      </div>
    </>
  );
};
