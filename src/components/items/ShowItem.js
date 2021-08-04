import { WrapText } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { useShowItems } from "../../hooks/useShowItems";
import { useUser } from "../../hooks/useUser";

export const ShowItem = ({ itemID }) => {
  const user = useUser();
  const item = useShowItems(itemID);
  
  // const [itemData, setItemData] = useState(null);
  // const [itemStats, setItemStats] = useState(null);
  // const [itemSuffix, setItemSuffix] = useState(null);
  // const [itemPrefix, setItemPrefix] = useState(null);

  // useEffect(() => {
  //   if (!user?.uid) {
  //     return;
  //   }
  //   return db
  //     .collection("users")
  //     .doc(user?.uid)
  //     .collection("armory")
  //     .doc(itemID)
  //     .onSnapshot((item) => {
  //       setItemData({
  //         name: item.data()?.name,
  //         prefix: item.data()?.Prefix,
  //         suffix: item.data()?.Suffix,
  //         quality: item.data()?.quality,
  //         type: item.data()?.type,
  //       });
  //     });
  // }, [user?.uid]);

  // useEffect(() => {
  //   if (!itemData) {
  //     return;
  //   }
  //   return db
  //     .collection("items")
  //     .doc(itemData?.type)
  //     .onSnapshot((stats) => {
  //       if (stats.data() === undefined) {
  //         return;
  //       }
  //       setItemStats(stats.data()[itemData?.name]);
  //     });
  // }, [itemData]);
  // useEffect(() => {
  //   if (!itemData) {
  //     return;
  //   }
  //   return db
  //     .collection("items")
  //     .doc(`${itemData.type}Suffix`)
  //     .onSnapshot((stats) => {
  //       if (stats.data() === undefined) {
  //         console.log("Loading");
  //         return;
  //       }
  //       setItemSuffix(
  //         itemData.suffix === ""
  //           ? stats.data()["none"]
  //           : stats.data()[itemData.suffix]
  //       );
  //     });
  // }, [itemData]);
  // useEffect(() => {
  //   if (itemData === null) {
  //     return;
  //   }
  //   db.collection("items")
  //     .doc(`${itemData.type}Prefix`)
  //     .onSnapshot((stats) => {
  //       if (stats.data() === undefined) {
  //         console.log("Loading");
  //         return;
  //       }
  //       setItemPrefix(
  //         itemData.prefix === ""
  //           ? stats.data()["none"]
  //           : stats.data()[itemData.prefix]
  //       );
  //     });
  // }, [itemData]);
  // const qualityDisplay = () => {
  //   if (itemData === null) {
  //     return;
  //   }
  //   if (itemData.quality === 1) {
  //     return;
  //   } else if (itemData.quality === 1.5) {
  //     return "Dobry";
  //   } else if (itemData.quality === 2.5) {
  //     return "Doskonały";
  //   }
  // };

  // const convertToArray = (itemProperty) => {
  //   if (itemProperty === null) {
  //     return ["Loading"];
  //   }
  //   return Object.keys(itemProperty).map((key) => ({
  //     name: key,
  //     value: itemProperty[key],
  //   }));
  // };

  // const itemStatsArray = convertToArray(itemStats);
  // const itemPrefixArray = convertToArray(itemPrefix);
  // const itemSuffixArray = convertToArray(itemSuffix);

  // const fullItemArray = [
  //   ...itemStatsArray,
  //   ...itemPrefixArray,
  //   ...itemSuffixArray,
  // ];

  // const fullItemStatsArray = [];
  // const mergeItemStats = new Map();
  // for (const stat of fullItemArray) {
  //   if (!mergeItemStats.has(stat?.name)) {
  //     mergeItemStats.set(stat?.name, true);
  //     let itemValue;
  //     let prefixValue;
  //     let suffixValue;
  //     itemStatsArray.map((itemStat) => {
  //       if (stat?.name === itemStat?.name) {
  //         return (itemValue = itemStat?.value);
  //       }
  //     });
  //     itemPrefixArray.map((itemPrefix) => {
  //       if (stat?.name === itemPrefix?.name) {
  //         return (prefixValue = itemPrefix?.value);
  //       }
  //     });
  //     itemSuffixArray.map((itemSuffix) => {
  //       if (stat?.name === itemSuffix?.name) {
  //         return (suffixValue = itemSuffix?.value);
  //       }
  //     });
  //     if (itemValue === undefined) {
  //       itemValue = "";
  //     }
  //     if (prefixValue === undefined) {
  //       prefixValue = "";
  //     }
  //     if (suffixValue === undefined) {
  //       suffixValue = "";
  //     }
  //     fullItemStatsArray.push({
  //       name: stat.name,
  //       value: itemValue + prefixValue + suffixValue,
  //     });
  //   }
  // }

  // let weaponDmgLow;
  // let weaponDmgUpp;
  // let weaponTotalDmg;
  // let weaponIcon;

  // fullItemStatsArray.map((el) => {
  //   if (el?.name === "totalDmg") {
  //     return (weaponTotalDmg = el?.value);
  //   }
  // });

  // fullItemStatsArray.map((el) => {
  //   if (el?.name === "dmgLow") {
  //     return (weaponDmgLow = el?.value + weaponTotalDmg);
  //   }
  //   if (el?.name === "dmgUpp") {
  //     return (weaponDmgUpp = el?.value + weaponTotalDmg);
  //   }
  //   if (weaponDmgUpp < weaponDmgLow) {
  //     return (weaponDmgUpp = weaponDmgLow);
  //   } else {
  //     return;
  //   }
  // });

  // fullItemStatsArray.map((el) => {
  //   if (el?.name === "icon") {
  //     return (weaponIcon = el?.value);
  //   }
  // });

  // const displayingQuality = qualityDisplay();

  // const unitsMap = {
  //   str: { label: "Siła" },
  //   agi: { label: "Zręczność" },
  //   tough: { label: "Wytrzymałość" },
  //   vit: { label: "Żywotność" },
  //   perc: { label: "Spostrzegawczość" },
  //   int: { label: "Inteligencja" },
  //   speed: { label: "Szybkość" },
  //   def: { label: "Obrona" },
  // };

  // console.log(204, fullItemStatsArray);

  return (
    <>
      {item.itemData ? (
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            width: "80%",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              width: "200px",
              height: "300px",
              border: "1px solid black",
            }}
          >
            <img
              src={item.weaponIcon}
              style={{
                width: "200px",
                height: "300px",
              }}
            />
          </div>
          <div>
            <div>Przedmiot</div>
            <div>
              Nazwa:{" "}
              <span>
                {item.displayingQuality} {item.itemData?.prefix} {item.itemData?.name}{" "}
                {item.itemData?.suffix}
              </span>
            </div>
            <div>
              Wartość przedmiotu:{" "}
              {item.itemData.quality *
                (item.itemStats?.value + item.itemSuffix?.value + item.itemPrefix?.value)}{" "}
              golda
            </div>
            <div>
              Obrażenia: {parseInt(item.itemData?.quality * item.weaponDmgLow)} {"-"}{" "}
              {parseInt(item.itemData?.quality * item.weaponDmgUpp)}
            </div>
            <div>
              Cechy:{" "}
              {item.fullItemStatsArray === ["Loading"]
                ? item.fullItemStatsArray
                : item.fullItemStatsArray
                    .sort(item.fullItemStatsArray?.name)
                    .map((el) => {
                      if (
                        el?.name === "icon" ||
                        el?.name === "value" ||
                        el?.name === "dmgLow" ||
                        el?.name === "dmgUpp"
                      ) {
                        return;
                      } else {
                        if (el?.value === 0) {
                          return;
                        } else {
                          return (
                            <span key={el?.name}>
                              {item.unitsMap[el?.name]?.label || el?.name}:{" +"}
                              {parseInt(item.itemData?.quality * el?.value)},{" "}
                            </span>
                          );
                        }
                      }
                    })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
