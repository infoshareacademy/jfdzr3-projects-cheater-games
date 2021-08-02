import { useCart } from "./CartContext";
import { useShopItems } from "./hooks";
import { Items } from "./Items";
import { ItemsGrid } from "./ItemsGrid";

export const MerchantOffer = () => {
  const { armorItems, handWeaponItems, helmetItems } = useShopItems();
  const { addToCart } = useCart();
  return (
    <ItemsGrid text="Kup">
      <h2>Zbroja</h2>
      <Items items={armorItems} onBuyClick={addToCart} />
      <h2>Broń</h2>
      <Items items={handWeaponItems} onBuyClick={addToCart} />
      <h2>Hełmy</h2>
      <Items items={helmetItems} onBuyClick={addToCart} />
    </ItemsGrid>
  );
};
