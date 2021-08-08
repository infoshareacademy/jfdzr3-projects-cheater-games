import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useUser } from "./useUser";

export const useUserItems = () => {
  const [userItems, setUserItems] = useState([]);
  const user = useUser();

  useEffect(() => {
    if (user?.uid) {
      return db.collection("users")
        .doc(user?.uid)
        .collection("armory")
        .onSnapshot((snapshot) => {
          const newUserItems = [];
          snapshot.docs.map((doc) => {
            if (doc.exists) {
              for (const property in doc.data()) {
                newUserItems.push({
                  id: doc.id,
                  key: property,
                  val: doc.data()[property],
                });
              }
            }
            return newUserItems;
          });
          setUserItems(newUserItems);
        });
    }
  }, [user?.uid]);
  return userItems;
};