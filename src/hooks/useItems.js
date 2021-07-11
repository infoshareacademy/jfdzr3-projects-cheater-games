import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

export const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.collection("items").onSnapshot((snapshot) => {
      const newItems = [];
      snapshot.docs.map((doc) => {
        for (const property in doc.data()) {
          newItems.push({
            type: doc.id,
            key: property,
            val: doc.data()[property],
          });
        }
        return newItems;
      });
      setItems(newItems);
    });
  }, []);
  return items;
};