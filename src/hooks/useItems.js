import { useEffect, useState } from "react";
import { db } from "../firebaseConfig"

export const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.collection("items").onSnapshot((snapshot) => {
      const newItems = [];
      snapshot.docs.map((doc) => {
        for (const property in doc.data()) {
          newItems.push({
            id: doc.id,
            key: property,
            val: doc.data()[property],
          });
        }

        return newItems;
      });
      setItems(newItems);
    });
  }, []);
  console.log(items);
  return items;
};

export default useItems;

