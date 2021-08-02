import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";
import { useCart } from "./CartContext";
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
        setItems(userItems.filter((item) => item.key !== undefined));
      });
  }, [uid]);

  return items;
};

export const UserInventory = () => {
  const items = useInventory();
  const { addToSellCart } = useCart();
  console.log(items);

  return (
    <ItemsGrid text="Sprzedaj">
      {items.length !== 0 ? (
        <Items items={items} onSellClick={addToSellCart} />
      ) : (
        <span>
          Nie masz żadnych rekwizytów. <br />
          Zdobądź je na polowaniu, bądź kup od Mirka Handlarza
        </span>
      )}
    </ItemsGrid>
  );
};
