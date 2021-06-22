import "../auth/auth.css";
import React from "react";
import { MainMenu } from "./MainMenu";
import firebase from "firebase/app";
import { Redirect } from "react-router-dom";
import useFirebaseAuthentication from "../auth/useFirebaseAuthentication";
import firebaseApp from "../firebaseConfig";

export const HomePage = () => {
  const authUser = useFirebaseAuthentication(firebase);
  let currentUser = firebaseApp.auth().currentUser;
  // console.log(authUser.displayName);
  return (
    <>
      <div className="content">
        <MainMenu />
        <main className="main__section">
          <h1 className="welcome">Witaj w grze {currentUser.displayName}</h1>
        </main>

        <aside className="advertising"></aside>
      </div>
    </>
  );
};
