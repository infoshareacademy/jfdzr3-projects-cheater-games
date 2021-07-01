import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useEffect, createContext } from "react";
import { useHitPoints } from "../hooks/useHitPoints";
import { useUser } from "../hooks/useUser";

// export const StatsContext = createContext();

export const FightingPanel = (props) => {
  const user = useUser();
  const hitPoints = useHitPoints(user);

  const monster = {
    level: 1,
    str: 10,
    agi: 10,
    tough: 10,
    vit: 10,
    perc: 10,
    int: 10,
    speed: 10,
  };

  const monsterPoints = useHitPoints(monster);

  const statsArray = [
    { name: "level", value: user?.level },
    { name: "str", value: user?.stats.str },
    { name: "agi", value: user?.stats.agi },
    { name: "tough", value: user?.stats.tough },
    { name: "vit", value: user?.stats.vit },
    { name: "perc", value: user?.stats.perc },
    { name: "int", value: user?.stats.int },
    { name: "speed", value: user?.stats.speed },
  ];

  const monsterArray = [
    { name: "level", value: monster.level },
    { name: "str", value: monster.str },
    { name: "agi", value: monster.agi },
    { name: "tough", value: monster.tough },
    { name: "vit", value: monster.vit },
    { name: "perc", value: monster.perc },
    { name: "int", value: monster.int },
    { name: "speed", value: monster.speed },
  ];

  const unitsMap = {
    level: { label: "Poziom" },
    str: { label: "Siła" },
    agi: { label: "Zręczność" },
    tough: { label: "Wytrzymałość" },
    vit: { label: "Żywotność" },
    perc: { label: "Spostrzegawczość" },
    int: { label: "Inteligencja" },
    speed: { label: "Szybkość" },
    def: { label: "Obrona" },
  };

  return (
    <>
    <div style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "flex-start",
          height: "100vh"
        }} >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ width: "220px", height: "280px", border: "2px solid black" }}
        ></div>
        <div
          style={{
            flexGrow: "1",
            display: "flex",
            flexFlow: "column",
            height: "240px",
            alignItems: "flex-start",
            margin: "0 auto",
            justifyContent: "space-evenly",
            margin: "15px",
          }}
        >
          <div>Punkty życia: {hitPoints}</div>
          {statsArray.map((el, i) => {
            return (
              <div key={i}>
                {unitsMap[el.name].label}: {el.value}
              </div>
            );
          })}
        </div>
        <div
          style={{
            flexGrow: "1",
            display: "flex",
            flexFlow: "column",
            height: "240px",
            alignItems: "flex-end",
            margin: "0 auto",
            justifyContent: "space-evenly",
            margin: "15px",
          }}
        >
          <div>Punkty życia potwora: {monsterPoints}</div>
          {monsterArray.map((el, i) => {
            return (
              <div key={i}>
                {unitsMap[el.name].label}: {el.value}
              </div>
            );
          })}
        </div>
        <div
          style={{ width: "220px", height: "280px", border: "2px solid black" }}
        ></div>
      </div>
      <div style={{marginTop: "20px"}}>Fighting Bar</div>
      </div>
    </>
  );
};
