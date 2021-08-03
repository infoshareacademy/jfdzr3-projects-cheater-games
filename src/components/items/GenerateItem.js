import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";

export const GenerateItem = () => {
  const user = useUser();

  const itemType = "handWeapon";

  const [itemName, setItemName] = useState([]);
  const [itemPrefix, setItemPrefix] = useState([]);
  const [itemSuffix, setItemSuffix] = useState([]);
  const [itemQuality, setItemQuality] = useState(1);
  const [itemID, setItemID] = useState(0);

  useEffect(() => {
    setItemID(Date.now());
    return;
  }, []);

  useEffect(() => {
    const random = Math.floor(Math.random() * 100);
    if (random < 55) {
      setItemQuality(1);
      return;
    }
    if (random >= 55 && random < 80) {
      setItemQuality(1.5);
      return;
    }
    if (random >= 80) {
      setItemQuality(2.5);
      return;
    }
  });

  useEffect(() => {
    return db
      .collection("items")
      .doc(itemType)
      .onSnapshot((itemList) => {
        if (!itemList) {
          return;
        }
        let itemsNamesArray = Object.keys(itemList?.data());
        let itemsValuesArray = [];
        itemsNamesArray.map((el, i) => {
          itemsValuesArray[i] = itemList.data()[itemsNamesArray[i]]?.value;
        });
        let itemsNamesAndValues = [];
        itemsNamesArray.map((names, i) => {
          return (itemsNamesAndValues[i] = {
            name: names,
            value: itemsValuesArray[i],
          });
        });
        const getFilteredValues = (itemArray) => {
          const random = Math.floor(Math.random() * 100);
          if (random < 75) {
            return itemArray?.value < 1000;
          }
          if (random < 85) {
            return itemArray?.value < 10000;
          }
          if (random < 95) {
            return itemArray?.value < 15000;
          }
          if (random <= 100) {
            return itemArray;
          }
        };
        const filteredItems = itemsNamesAndValues.filter(getFilteredValues);
        const randomItemFactor = Math.floor(
          Math.random() * (filteredItems.length - 1)
        );
        setItemName(filteredItems[randomItemFactor]);
        return;
      });
  }, [db]);

  useEffect(() => {
    const random = Math.floor(Math.random() * 100);
    if (random > 55) {
      setItemPrefix({ name: "", value: 0 });
      return;
    } else {
      return db
        .collection("items")
        .doc(`${itemType}Prefix`)
        .onSnapshot((itemList) => {
          if (!itemList) {
            return;
          }
          let itemsNamesArray = Object.keys(itemList?.data());
          let itemsValuesArray = [];
          itemsNamesArray.map((el, i) => {
            itemsValuesArray[i] = itemList.data()[itemsNamesArray[i]]?.value;
          });
          let itemsNamesAndValues = [];
          itemsNamesArray.map((names, i) => {
            return (itemsNamesAndValues[i] = {
              name: names,
              value: itemsValuesArray[i],
            });
          });
          const getFilteredValues = (itemArray) => {
            const random = Math.floor(Math.random() * 100);
            if (random < 75) {
              return itemArray?.value < 1000 && itemArray?.value > 0;
            }
            if (random < 85) {
              return itemArray?.value < 10000 && itemArray?.value > 0;
            }
            if (random < 95) {
              return itemArray?.value < 15000 && itemArray?.value > 0;
            }
            if (random <= 100) {
              return itemArray > 0;
            }
          };
          const filteredItems = itemsNamesAndValues.filter(getFilteredValues);
          const randomPrefixFactor = Math.floor(
            Math.random() * filteredItems.length
          );
          setItemPrefix(filteredItems[randomPrefixFactor]);
          return;
        });
    }
  }, [db]);

  useEffect(() => {
    const random = Math.floor(Math.random() * 100);
    if (random > 65) {
      setItemSuffix({ name: "", value: 0 });
      return;
    }
    return db
      .collection("items")
      .doc(`${itemType}Suffix`)
      .onSnapshot((itemList) => {
        if (!itemList) {
          return;
        }
        let itemsNamesArray = Object.keys(itemList?.data());
        let itemsValuesArray = [];
        itemsNamesArray.map((el, i) => {
          itemsValuesArray[i] = itemList.data()[itemsNamesArray[i]]?.value;
        });
        let itemsNamesAndValues = [];
        itemsNamesArray.map((names, i) => {
          return (itemsNamesAndValues[i] = {
            name: names,
            value: itemsValuesArray[i],
          });
        });
        const getFilteredValues = (itemArray) => {
          const random = Math.floor(Math.random() * 100);
          if (random < 75) {
            return itemArray?.value < 1000 && itemArray?.value > 0;
          }
          if (random < 85) {
            return itemArray?.value < 10000 && itemArray?.value > 0;
          }
          if (random < 95) {
            return itemArray?.value < 15000 && itemArray?.value > 0;
          }
          if (random <= 100) {
            return itemArray > 0;
          }
        };
        const filteredItems = itemsNamesAndValues.filter(getFilteredValues);
        const randomSuffixFactor = Math.floor(
          Math.random() * (filteredItems.length - 1)
        );
        setItemSuffix(filteredItems[randomSuffixFactor]);
        return;
      });
  }, [db]);

  const fullItem = {
    name: itemName?.name,
    Prefix: itemPrefix?.name,
    Suffix: itemSuffix?.name,
    type: itemType,
    quality: itemQuality,
  }

// console.log(181, itemName);

  // const addItem = () => {
  //   if (!user?.uid) {
  //     return;
  //   }
  //   if (itemName?.name === undefined || itemSuffix?.name === undefined || itemPrefix?.name === undefined){
  //     return;
  //   }
  //   else {
  // db.collection("users")
  //   .doc(user?.uid).collection("armory")
  //   .doc(String(itemID))
  //   .set({
  //     name: itemName?.name,
  //     Prefix: itemPrefix?.name,
  //     Suffix: itemSuffix?.name,
  //     type: itemType,
  //     quality: itemQuality,
  //   })}
  //   return;
  // }

  // addItem();

  const qualityDisplay = () => {
    if (itemQuality === 1) {
      return;
    } else if (itemQuality === 1.5) {
      return "Dobry";
    } else if (itemQuality === 2.5) {
      return "Doskonały";
    }
  };

  const displayingQuality = qualityDisplay();

  return (
    <>
      <div>Wylosowano item: {displayingQuality} {" "} {fullItem?.Prefix} {" "} {fullItem?.name} {" "} {fullItem?.Suffix} {" "} </div>
    </>
  );
};
