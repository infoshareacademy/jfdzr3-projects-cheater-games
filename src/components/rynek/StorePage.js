import "./store.css";
import { Avatar } from "./Avatar";
import { Items } from "./Items";
import { ItemsGrid } from "./ItemsGrid";
import { useUser } from "../../hooks/useUser";
import { useItems } from "../../hooks/useItems";
import { useUserItems } from "../../hooks/useUserItems";
import { db } from "../../firebaseConfig";
import { CartInformation } from "./CartInformation";
import { TextBlock } from "./TextBlok";
import { GlobalChat } from "../../global-chat/global-chat";

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
    <section className="store__screen" style={{margin: "0 auto"}}>
    <div>
      <h1 style={{textAlign: "center"}}>Mirek Handlarz</h1>
      <CartInformation productCount={1} />
      </div>
      <div className="store-wrapper">
        <ItemsGrid text="Sprzedaj">
          <Items items={userItemsRef} />
        </ItemsGrid>
        <Avatar />
        <ItemsGrid text="Kup">
          <Items items={itemsRef} />
        </ItemsGrid>
      </div>
    </section>
      <GlobalChat />
      </>
  );
};
