import { Items } from "./Items";
import { ItemsGrid } from "./ItemsGrid";

export const UserInventory = () => {
  return (
    <ItemsGrid text="Sprzedaj">
      <Items items={[]} />
    </ItemsGrid>
  );
};
