import { useEffect, useState } from "react";

export const useItems = (collectionPath) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
      collectionPath.onSnapshot((snapshot) => {
        const newItems = [];
        snapshot.docs.map((doc) => {
          if (doc.exists) {
          for (const property in doc.data()) {
            newItems.push({
              type: doc.id,
              key: property,
              val: doc.data()[property],
            });
          }
        }
          return newItems;
        });
        setItems(newItems);
      });
    
  }, [collectionPath]);
  return items;
};
