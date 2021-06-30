import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useEffect, createContext } from "react";
import { useHitPoints } from "../hooks/useHitPoints";
import { useUser } from "../hooks/useUser";

// export const StatsContext = createContext();

export const FightingBar = (props) => {
  const user = useUser();
  const hitPoints = useHitPoints(user);

  const statsArray = [
    { name: "str", value: user?.stats.str },
    { name: "agi", value: user?.stats.agi },
    { name: "tough", value: user?.stats.tough },
    { name: "vit", value: user?.stats.vit },
    { name: "perc", value: user?.stats.perc },
    { name: "int", value: user?.stats.int },
    { name: "speed", value: user?.stats.speed },
  ];

  return (
    <>
      <div>Punkty życia: {hitPoints}</div>
      {statsArray.map((el, i) => {
        return <div key={i}>{el.name}: {el.value === null ? "loading" : el.value}</div>;
      })}
    </>
  );
};
