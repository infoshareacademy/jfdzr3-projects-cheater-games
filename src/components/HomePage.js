import "../auth/auth.css";
import React from "react";
import { useUser } from "../hooks/useUser";
import { SelectRace } from "./SelectRace";
import { GlobalChat } from "../global-chat/global-chat";

export const HomePage = () => {
  // const authUser = useFirebaseAuthentication(firebase);
  // let currentUser = firebaseApp.auth().currentUser;
  // console.log(currentUser.displayName);
  // // console.log(authUser.displayName);
  const user = useUser();

  return (
    <>
      <h1 className="welcome">Witaj w grze {user?.name}</h1>
      <GlobalChat />
      {user?.race === undefined && <SelectRace />}
    </>
  );
};
