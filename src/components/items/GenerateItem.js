import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";

export const GenerateItem = () => {
  const user = useUser();

  const [itemType, setItemType] = useState([]);

  useEffect(() => {
    return db
      .collection("items")
      .doc("handWeapon")
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
          const random = Math.floor(Math.random() * 100)
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
        const randomItemFactor = Math.floor(Math.random() * (filteredItems.length - 1))
        console.log("Filter", filteredItems, "Random", randomItemFactor, "Exact item", filteredItems[randomItemFactor]);
        setItemType(filteredItems[randomItemFactor]);
      });
  }, [db]);

  return (
    <>
          <div key={itemType?.name}>
            {itemType?.name}: {itemType?.value}
          </div>
    </>
  );
};
