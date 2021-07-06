import { ItemsGrid } from "./ItemsGrid";
import "./store.css";
import { TextBlock } from "./TextBlok";

export const StorePage = () => (
  <>
    <h1>Mirek Handlarz</h1>
    <div className="store-wrapper">
      <ItemsGrid text="Sprzedaj"></ItemsGrid>
      <ItemsGrid></ItemsGrid>
      <ItemsGrid text="Kup"></ItemsGrid>
    </div>
  </>
);
