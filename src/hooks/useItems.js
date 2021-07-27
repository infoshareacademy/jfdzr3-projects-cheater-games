import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export const useItems = (collectionPath) => {
  const [items, setItems] = useState([]);
  const user = useUser();

  useEffect(() => {
    if (user?.uid){
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
    }
  }, [collectionPath, user?.uid]);
  return items;
};

// useItems(type)

// const type = db.collection("users").doc(user?.uid).collection("armory").doc("jakiś co nas interesuje").get((snapshott) => {
//   snapshot.data().type
// })

// const item = db.collection("items").doc(type) + db.collection('items').doc(`${type}Suffix`)

