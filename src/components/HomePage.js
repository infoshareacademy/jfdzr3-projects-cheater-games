import "../auth/auth.css";
import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { SelectRace } from "./SelectRace";
import { GlobalChat } from "../global-chat/global-chat";
import { Login } from "../auth/Login";
import { auth, db } from "../firebaseConfig";
import { ShowItem } from "./items/ShowItem";
import { useUserItems } from "../hooks/useUserItems";

export const HomePage = () => {
  const user = useUser();
  
 const userItemCollection = useUserItems();

const result = [];
const map = new Map();
for (const item of userItemCollection) {
    if(!map.has(item.id)){
        map.set(item.id, true);    // set any value to Map
        result.push(
            item.id,
        );
    }
}

  return (
    <>
      {user !== null ? (
        <>
          <h1 className="welcome">Witaj w grze {user.name}</h1>
          <div>
          {result.map(itemID => {
            console.log(35, itemID);
          return <ShowItem itemID={itemID} />
          })}
          </div>
          {user.race === undefined ? <SelectRace /> : <GlobalChat />}
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
};
