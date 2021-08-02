import styled from "styled-components";
import { Item } from "./Item";
import { useCart } from "./CartContext";

export const ItemStyle = styled.div`
  display: grid;
  align-content: space-around;
  grid-auto-rows: 35% 45% 20%;
  height: max-content;
  width: "100%";
  justify-items: center;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  padding: 0 5px;
  width: 100%;
  height: 100%;
  min-width: 10px;
  min-height: 165px;
`;

export const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(103px, 1fr));
  grid-auto-rows: 165px;
  grid-gap: 10px;
`;

export const Items = ({ items, onBuyClick, onSellClick }) => {
  const { getCartItems, getSellCartItems } = useCart();
  const sellItems = getSellCartItems();
  const buyItems = getCartItems();

  if (items.length === 0) {
    return <></>;
  }
  return (
    <Wrapper>
      {items &&
        items.map((item, index) => (
          <ItemStyle
            key={index}
            style={{
              backgroundColor:
                sellItems.find((sellItem) => sellItem.id === item.id) ||
                buyItems.find((buyItem) =>
                    buyItem.key === item.key && item.type === "handWeapon"
                )
                  ? "rgba(49, 94, 60, 0.20)"
                  : "inherit"
            }}
          >
            <Item
              icon={item.val.icon}
              name={item.key}
              value={item.val.value}
              onBuyClick={onBuyClick && (() => onBuyClick(item))}
              onSellClick={onSellClick && (() => onSellClick(item))}
            />
          </ItemStyle>
        ))}
    </Wrapper>
  );
};
