import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";
import { Items } from "./Items";
import { ItemsGrid } from "./ItemsGrid";

const useInventory = () => {
  const user = useUser();
  const [items, setItems] = useState([]);
  const uid = user?.uid;

  useEffect(() => {
    if (!uid) {
      return;
    }

    return db
      .collection("users")
      .doc(uid)
      .collection("armory")
      .onSnapshot((snapshot) => {
        const userItems = [];
        snapshot.forEach((doc) => {
          userItems.push({ id: doc.id, key: doc.data().name, val: doc.data() });
        });
        setItems(userItems);
      });
  }, [uid]);

  return items;
};

export const UserInventory = () => {
  const items = useInventory();

  return (
    <ItemsGrid text="Sprzedaj">
      <Items items={items} />
    </ItemsGrid>
  );
};
