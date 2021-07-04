import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

export const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.collection("items").onSnapshot((snapshot) => {
      const newItems = [];
      snapshot.docs.map((doc) => {
        for (const property in doc.data()) {
          // console.log({id: doc.id,key: property, val: doc.data()[property]});
          newItems.push({
            id: doc.id,
            key: property,
            val: doc.data()[property],
          });
          // setItems({id: doc.id,key: property, val: doc.data()[property]});
        }

        return newItems;
      });
      console.log(newItems);
      setItems(newItems);
    });
  }, []);
  return items;
};


