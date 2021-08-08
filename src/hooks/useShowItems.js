import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useUser } from "../hooks/useUser";

export const useShowItems = (itemID) => {
  const user = useUser();

  const [itemData, setItemData] = useState({});
  const [itemStats, setItemStats] = useState(null);
  const [itemSuffix, setItemSuffix] = useState(null);
  const [itemPrefix, setItemPrefix] = useState(null);

  useEffect(() => {
    if (typeof itemID === "string") {
      if (!user?.uid) {
        return;
      }
      return db
        .collection("users")
        .doc(user?.uid)
        .collection("armory")
        .doc(itemID)
        .onSnapshot((item) => {
          setItemData({
            name: item.data()?.name,
            prefix: item.data()?.prefix,
            suffix: item.data()?.suffix,
            quality: item.data()?.quality,
            type: item.data()?.type,
          });
        });
    } else {
      if (itemID.name === undefined) {
        return;
      }
      setItemData({
        name: itemID?.name,
        prefix: itemID?.prefix,
        suffix: itemID?.suffix,
        quality: itemID?.quality,
        type: itemID?.type,
      });
    }
  }, [user?.uid, itemID]);

  useEffect(() => {
    if (!itemData) {
      return;
    }
    return db
      .collection("items")
      .doc(itemData?.type)
      .onSnapshot((stats) => {
        if (stats.data() === undefined) {
          return;
        }
        setItemStats(stats.data()[itemData?.name]);
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
    return db
      .collection("items")
      .doc(`${itemData.type}Prefix`)
      .onSnapshot((stats) => {
        if (stats.data() === undefined) {
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
    if (itemProperty === null || itemProperty === undefined) {
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
      mergeItemStats.set(stat?.name, true);
      let itemValue;
      let prefixValue;
      let suffixValue;
      itemStatsArray.forEach((itemStat) => {
        if (stat?.name === itemStat?.name) {
          return (itemValue = itemStat?.value);
        }
      });
      itemPrefixArray.forEach((itemPrefix) => {
        if (stat?.name === itemPrefix?.name) {
          return (prefixValue = itemPrefix?.value);
        }
      });
      itemSuffixArray.forEach((itemSuffix) => {
        if (stat?.name === itemSuffix?.name) {
          return (suffixValue = itemSuffix?.value);
        }
      });
      if (itemValue === undefined) {
        itemValue = "";
      }
      if (prefixValue === undefined) {
        prefixValue = "";
      }
      if (suffixValue === undefined) {
        suffixValue = "";
      }
      fullItemStatsArray.push({
        name: stat.name,
        value: itemValue + prefixValue + suffixValue,
      });
    }
  }

  let magicDmgLow = itemPrefix?.dmgLow + itemSuffix?.dmgLow;
  let magicDmgUpp = itemPrefix?.dmgUpp + itemSuffix?.dmgUpp;

  let weaponDmgLow;
  let weaponDmgUpp;
  let weaponTotalDmg;
  let weaponIcon;

  fullItemStatsArray.forEach((el) => {
    if (el?.name === "totalDmg") {
      return (weaponTotalDmg = el?.value);
    }
  });

  fullItemStatsArray.forEach((el) => {
    if (el?.name === "dmgLow") {
      return (weaponDmgLow = el?.value + weaponTotalDmg);
    }
    if (el?.name === "dmgUpp") {
      return (weaponDmgUpp = el?.value + weaponTotalDmg);
    }
    if (weaponDmgUpp <= weaponDmgLow) {
      return (weaponDmgUpp = weaponDmgLow);
    } else {
      return;
    }
  });

  fullItemStatsArray.forEach((el) => {
    if (el?.name === "icon") {
      return (weaponIcon = el?.value);
    }
  });

  fullItemStatsArray.push(
    {
      name: "magicDmgUpp",
      value: magicDmgUpp,
    },
    {
      name: "magicDmgLow",
      value: magicDmgLow,
    }
  );

  const unitsMap = {
    str: { label: "Siła" },
    agi: { label: "Zręczność" },
    tough: { label: "Wytrzymałość" },
    vit: { label: "Żywotność" },
    perc: { label: "Spostrzegawczość" },
    int: { label: "Inteligencja" },
    speed: { label: "Szybkość" },
    def: { label: "Obrona" },
    totalDmg: { label: "Obrażenia" },
    magicDmgLow: { label: "Obrażenia minimalne" },
    magicDmgUpp: { label: "Obrażenia maksymalne" },
  };

  const displayingQuality = qualityDisplay();

  return {
    fullItemStatsArray,
    itemData,
    itemStats,
    itemPrefix,
    itemSuffix,
    weaponDmgLow,
    weaponDmgUpp,
    weaponIcon,
    weaponTotalDmg,
    displayingQuality,
    unitsMap,
  };
};
