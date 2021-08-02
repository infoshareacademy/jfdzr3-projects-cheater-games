import "../auth/auth.css";
import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { SelectRace } from "./SelectRace";
import { GlobalChat } from "../global-chat/global-chat";
import { Login } from "../auth/Login";
import { auth, db } from "../firebaseConfig";

export const HomePage = () => {
  const user = useUser();
  const uid = "1GfobW6nhnS3Txl13MBxO4F30pm2";

  const [itemData, setItemData] = useState(null);
  const [itemStats, setItemStats] = useState(null);
  const [itemSuffix, setItemSuffix] = useState(null);
  const [itemPrefix, setItemPrefix] = useState(null);

  // const getItemData = () => {

  useEffect(() => {
    if (!uid) {
      return;
    }
    return db
      .collection("users")
      .doc(uid)
      .collection("armory")
      .doc("210701182001200")
      .onSnapshot((item) => {
        setItemData({
          name: item.data()?.name,
          prefix: item.data()?.Prefix,
          suffix: item.data()?.Suffix,
          quality: item.data()?.quality,
          type: item.data()?.type,
        });
      });
  }, [uid]);
  useEffect(() => {
    if (!itemData) {
      return;
    }
    console.log(itemData);
    return db
      .collection("items")
      .doc(itemData.type)
      .onSnapshot((stats) => {
        setItemStats(stats.data()[itemData.name]);
      });
  }, [itemData]);
  useEffect(() => {
    if (!itemData) {
      return;
    }
    return db
      .collection("items")
      .doc(`${itemData.type}Suffix`)
      .onSnapshot((stats) => {
        if (stats.data() === undefined) {
          console.log("Loading");
          return;
        }
        setItemSuffix(
          itemData.suffix === ""
            ? stats.data()["none"]
            : stats.data()[itemData.suffix]
        );
      });
  }, [itemData]);
  useEffect(() => {
    if (itemData === null) {
      return;
    }
    db.collection("items")
      .doc(`${itemData.type}Prefix`)
      .onSnapshot((stats) => {
        if (stats.data() === undefined) {
          console.log("Loading");
          return;
        }
        setItemPrefix(
          itemData.prefix === ""
            ? stats.data()["none"]
            : stats.data()[itemData.prefix]
        );
      });
  }, [itemData]);
  const qualityDisplay = () => {
    if (itemData === null) {
      return;
    }
    if (itemData.quality === 1) {
      return;
    } else if (itemData.quality === 1.5) {
      return "Dobry";
    } else if (itemData.quality === 2.5) {
      return "Doskonały";
    }
  };

  const convertToArray = (itemProperty) => {
    if (itemProperty === null) {
      return ["Loading"];
    }
    return Object.keys(itemProperty).map((key) => ({
      stats: key,
      name: itemProperty[key],
    }));
  };

  // console.log(109, convertToArray(itemStats));
  // console.log(110, convertToArray(itemPrefix));
  // console.log(111, convertToArray(itemSuffix));

  const itemStatsArray = convertToArray(itemStats);

  console.log(convertToArray(null))
  console.log(itemStatsArray);

  // console.log(127, itemStatsArrayWithValues());
  // const handleHover = (e) => {
  //   <div style={{position: "absolute", left: "50%", top: "50%", width: "400px", height: "200px"}}>{itemData?.suffix}</div>
  // }
  // onMouseOver={handleHover}
  const displayingQuality = qualityDisplay();
  return (
    <>
      {user !== null ? (
        <>
          <h1 className="welcome">Witaj w grze {user.name}</h1>
          {itemData ? (
            <div>
              <div>Masz mój miecz:</div>
              <div>
                Nazwa:{" "}
                <span>
                  {displayingQuality} {itemData?.prefix} {itemData?.name}{" "}
                  {itemData?.suffix}
                </span>
              </div>
              <div>
                Wartość przedmiotu:{" "}
                {itemData.quality *
                  (itemStats?.value +
                    itemSuffix?.value +
                    itemPrefix?.value)}{" "}
                golda
              </div>
              <div>
                Obrażenia: {itemStats?.dmgLow} {"-"} {itemStats?.dmgUpp}
              </div>
              <div>Cechy: {" "} {itemStatsArray === ["Loading"] ? itemStatsArray : itemStatsArray.sort().map(el => {
                if (el?.stats === "icon" || el?.stats === "value"){
                  return;
                }
                else {
                if (el?.name === 0) {
                  return;
                }
                else {
                  return <span>{el?.stats}: {el?.name}, </span>
              }}})}</div>
            </div>
          ) : null}
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
