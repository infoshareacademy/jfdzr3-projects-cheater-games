import styled from "styled-components";
import { Item } from "./Item";
import { useCart } from "./CartContext";

export const ItemStyle = styled.div`
  display: grid;
  align-content: space-around;
  // grid-auto-rows: auto 70px 15px;
  grid-auto-rows: 25% 55% 20%;
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
  min-height: 160px;
  // align-content: space-around;
`;

export const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-auto-rows: 160px;
  grid-gap: 10px;
`;

export const Items = ({ items, onBuyClick, onSellClick }) => {
const {getSellCartItems} = useCart();
const sellItems = getSellCartItems();
console.log(sellItems.map((el) => el.id));

const changeBackground = (e) => {
  // e.currentTarget.style.background = "lightgrey"

}

  if (items.length === 0) {
    return <></>;
    // <p>Brak przedmiotów</p>;
  }
console.log(items);
  return (
    <Wrapper>
      {items &&
        items.map((item, index) => (
          <ItemStyle key={index} onClick={changeBackground}  style={{backgroundColor: (sellItems.find((sellItem) => sellItem.id === item.id) ? "lightgrey" : "inherit")}} > 
          
        
          {/* style={{ backgroundColor: (background.item === item.title && background.isSelected) ? 'blue' : 'red' }} */}

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
