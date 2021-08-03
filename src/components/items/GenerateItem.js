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
  }, []);

  useEffect(() => {
    const random = Math.floor(Math.random() * 100);
    if (random < 75) {
      setItemQuality(1);
    }
    if (random >= 75 && random < 90) {
      setItemQuality(1.5);
    }
    if (random >= 90) {
      setItemQuality(2.5);
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
      });
  }, [db]);

  useEffect(() => {
    const random = Math.floor(Math.random() * 100);
    if (random > 45) {
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
        });
    }
  }, [db]);

  useEffect(() => {
    const random = Math.floor(Math.random() * 100);
    if (random > 55) {
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
      });
  }, [db]);

  const fullItem = {
    name: itemName?.name,
    Prefix: itemPrefix?.name,
    Suffix: itemSuffix?.name,
    type: itemType,
    quality: itemQuality,
  }

  // const addItem = (e) => {
  //   e.preventDefault();
  //   if (!user?.uid) {
  //     return;
  //   }
  //   else {
  //     console.log(204, user?.uid);
  // return db.collection("users")
  //   .doc(user?.uid)
  //   .collection("armory")
  //   .doc(itemID)
  //   .set(fullItem);}
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
      <div>Wylosowano item: {displayingQuality} {" "} {fullItem?.Prefix} {" "} {fullItem?.name} {" "} {fullItem?.Suffix} {" "} <button className="btn btn-small btn-green">Dodaj do bazy danych</button></div>
      {/* onClick={addItem}  */}
      {/* <div key={itemID}>{itemID}</div>
      <div key={itemQuality}>{itemQuality}</div>
      <div key={itemPrefix?.name}>
        {itemPrefix?.name}: {itemPrefix?.value}
      </div>
      <div key={itemName?.name}>
        {itemName?.name}: {itemName?.value}
      </div>
      <div key={itemSuffix?.name}>
        {itemSuffix?.name}: {itemSuffix?.value}
      </div> */}
    </>
  );
};
