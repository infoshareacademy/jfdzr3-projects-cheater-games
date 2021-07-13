import "./store.css";
import { Avatar } from "./Avatar";
import { Items } from "./Items";
import { ItemsGrid } from "./ItemsGrid";
import { useUser } from "../../hooks/useUser";
import { useItems } from "../../hooks/useItems";
import { useUserItems } from "../../hooks/useUserItems";
import { db } from "../../firebaseConfig";





export const StorePage = () => {
  const user = useUser();
  const itemsCollectionPath = db.collection("items");
  const userItemsCollectionPath = db
  .collection("users")
  .doc(user?.uid)
  .collection("armory");
  const itemsRef = useItems(itemsCollectionPath);
  const userItemsRef = useUserItems(userItemsCollectionPath); 
  
  return (
    <>
      <h1>Mirek Handlarz</h1>
      <div className="store-wrapper">
        <ItemsGrid text="Kup">
          <Items items={itemsRef} />
          {/* <Items items={itemsRef} />
          <Items items={itemsRef} /> */}


        </ItemsGrid>
        <Avatar />
        <ItemsGrid text="Sprzedaj">
          <Items items={userItemsRef} />
          
        </ItemsGrid>
      </div>
      </>
  );
};
