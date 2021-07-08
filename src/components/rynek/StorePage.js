import "./store.css";
import { Avatar } from "./Avatar";
import { Items } from "./Items";
import { ItemsGrid } from "./ItemsGrid";
import { TextBlock } from "./TextBlok";

export const StorePage = () => {
    const docRef = {
        itemsRef: "db.collection('items')",
        userItemsRef: "db.collection('users').doc(uid).collection(armory)"
    }
    const {itemsRef, userItemsRef } = docRef;

    return(
  <>
    <h1>Mirek Handlarz</h1>
    <div className="store-wrapper">
      <ItemsGrid text="Sprzedaj" />
      <Avatar />
      <ItemsGrid text="Kup">
      <Items />

      </ItemsGrid>
    </div>
  </>
    )
};
