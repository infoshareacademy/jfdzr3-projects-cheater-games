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
      name: key,
      value: itemProperty[key],
    }));
  };

  const itemStatsArray = convertToArray(itemStats);
  const itemPrefixArray = convertToArray(itemPrefix);
  const itemSuffixArray = convertToArray(itemSuffix);

  const fullItemArray = [
    ...itemStatsArray,
    ...itemPrefixArray,
    ...itemSuffixArray,
  ];

  const fullItemStatsArray = [];
  const mergeItemStats = new Map();
  for (const stat of fullItemArray) {
    if (!mergeItemStats.has(stat?.name)) {
      mergeItemStats.set(stat?.name, true); // set any value to Map
      let itemValue;
      let prefixValue;
      let suffixValue;
      itemStatsArray.map((itemStat) => {
        if (stat?.name === itemStat?.name) {
          return (itemValue = itemStat?.value);
        }
      });
      itemPrefixArray.map((itemPrefix) => {
        if (stat?.name === itemPrefix?.name) {
          return (prefixValue = itemPrefix?.value);
        }
      });
      itemSuffixArray.map((itemSuffix) => {
        if (stat?.name === itemSuffix?.name) {
          return (suffixValue = itemSuffix?.value);
        }
      });
      if (itemValue === undefined) {
        itemValue = 0;
      }
      if (prefixValue === undefined) {
        prefixValue = 0;
      }
      if (suffixValue === undefined) {
        suffixValue = 0;
      }
      fullItemStatsArray.push({
        name: stat.name,
        value: itemValue + prefixValue + suffixValue,
      });
    }
  }

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
                Obrażenia: {parseInt(itemData?.quality * itemStats?.dmgLow)} {"-"} {parseInt(itemData?.quality * itemStats?.dmgUpp)}
              </div>
              <div>
                Cechy:{" "}
                {fullItemStatsArray === ["Loading"]
                  ? fullItemStatsArray
                  : fullItemStatsArray
                      .sort(fullItemStatsArray?.name)
                      .map((el) => {
                        if (el?.name === "icon") {
                          return;
                          // (
                          //   <div
                          //     style={{
                          //       width: "200px",
                          //       height: "300px",
                          //       border: "1px solid black",
                          //     }}
                          //   >
                          //     <img
                          //       src={el?.value}
                          //       style={{ width: "200px", height: "300px" }}
                          //     />
                          //   </div>
                          // );
                        }
                        if (el?.name === "value") {
                          return;
                        } else {
                          if (el?.value === 0) {
                            return;
                          } else {
                            return (
                              <span key={el.name}>
                                {el?.name}: {parseInt(itemData?.quality * el?.value)},{" "}
                              </span>
                            );
                          }
                        }
                      })}
              </div>
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
