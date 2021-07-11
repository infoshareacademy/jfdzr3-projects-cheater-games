import "./store.css";
import { Avatar } from "./Avatar";
import { Items } from "./Items";
import { ItemsGrid } from "./ItemsGrid";
import { TextBlock } from "./TextBlok";
import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";
import { useItems } from "../../hooks/useItems";
import { useUserItems } from "../../hooks/useUserItems";

export const StorePage = () => {
  const user = useUser();
  // const itemsCollectionPath = db.collection('items');
  // const userItemsCollectionPath = db.collection('users').doc(user?.uid).collection('armory');
  const itemsRef = useItems();
  const userItemsRef = useUserItems();
  console.log(itemsRef);
  console.log(userItemsRef);

  return (
    <>
      <h1>Mirek Handlarz</h1>
      <div className="store-wrapper">
        <ItemsGrid text="Sprzedaj">
          <Items items={itemsRef} />
        </ItemsGrid>
        <Avatar />
        <ItemsGrid text="Kup">
          <Items items={userItemsRef} />
        </ItemsGrid>
      </div>
    </>
  );
};
