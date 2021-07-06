import "./store.css";
import { Avatar } from "./Avatar";
import { Item } from "./Items";
import { ItemsGrid } from "./ItemsGrid";
import { TextBlock } from "./TextBlok";

export const StorePage = () => (
  <>
    <h1>Mirek Handlarz</h1>
    <div className="store-wrapper">
      <ItemsGrid text="Sprzedaj">
          <Item />
      </ItemsGrid>
      <Avatar />
      <ItemsGrid text="Kup"></ItemsGrid>
    </div>
  </>
);
