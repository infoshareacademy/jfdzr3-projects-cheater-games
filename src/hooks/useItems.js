import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export const useItems = (collectionPath) => {
  const [items, setItems] = useState([]);
  const user = useUser();

  useEffect(() => {
    if (user?.uid) {
      collectionPath.onSnapshot((snapshot) => {
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
    }
  }, [user?.uid]);
  return items;
};
