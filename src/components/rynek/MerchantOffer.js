import { useCart } from "./CartContext";
import { useShopItems } from "./hooks";
import { Items } from "./Items";
import { ItemsGrid } from "./ItemsGrid";
// import { TextBlock } from "./TextBlock";


export const MerchantOffer = () => {
  const { armorItems, handWeaponItems, helmetItems } = useShopItems();
  const { addToCart } = useCart();
  return (
    <ItemsGrid text="Kup">
      {/* <TextBlock>Zbroja</TextBlock> */}
      <Items items={armorItems} onBuyClick={addToCart} />
      {/* <TextBlock>Broń</TextBlock> */}
      <Items items={handWeaponItems} onBuyClick={addToCart} />
      {/* <TextBlock>Hełmy</TextBlock> */}
      <Items items={helmetItems} onBuyClick={addToCart} />
    </ItemsGrid>
  );
};
