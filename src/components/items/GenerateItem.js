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
            return itemsNamesAndValues[i] = {
              name: names,
              value: itemsValuesArray[i],
            };
          });
          setItemType(itemsNamesAndValues);
      });
  }, [db]);

  console.log(29, itemType[0]?.name);

  return (
      <>
      {itemType.map((item, i) => {
        <div>{item}</div>
      })}
      </>
  )};
