import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

const useItems = (type) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    return db
      .collection("items")
      .doc(type)
      .onSnapshot((doc) => {
        const data = doc.data()
        const itemIds = Object.keys(data);

        const itemsOfType = itemIds.map((id) => {
          return {
            type,
            key: id,
            val: { ...data[id] },
          };
        });

        setItems(itemsOfType);
      });
  }, []);

  return items;
};

export const useShopItems = () => {
  const armorItems = useItems("armor");
  const handWeaponItems = useItems("handWeapon");
  const helmetItems = useItems("helmet");

  return {
    armorItems,
    handWeaponItems,
    helmetItems,
  };
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};
