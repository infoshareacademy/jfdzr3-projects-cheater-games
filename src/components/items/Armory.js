import "../auth/auth.css";
import React from "react";
import { useUser } from "../hooks/useUser";
import { useUserItems } from "../hooks/useUserItems";
import { ShowItem } from "./items/ShowItem";

export const HomePage = () => {
  const user = useUser();
  
  const userItemCollection = useUserItems();

  const result = [];

  if (userItemCollection === undefined) {
    return;
  } else {
    const map = new Map();
    for (const item of userItemCollection) {
      if (!map.has(item.id)) {
        map.set(item.id, true);
        result.push(item.id);
      }
    }
  }

  return (
    <>
      <div>
        {result.map((itemID) => {
          return <ShowItem itemID={itemID} key={itemID} />;
        })}
      </div>
    </>
  );
};
