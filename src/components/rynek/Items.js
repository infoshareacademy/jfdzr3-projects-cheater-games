import styled from "styled-components";
import Chip from "@material-ui/core/Chip";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import { Item } from "./Item";

const ItemStyle = styled.div`
  height: max-content;
  width: "100%";
  justify-content: space-around;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  padding: 0 5px;
  min-width: 80px;
  min-height: 110px;
`;
export const Items = ({ items, onBuyClick }) => {
  console.log(items);

  if (items.length === 0) {
    return <p>Nie posiadasz jeszcze przedmiotów</p>;
  } else {
    return (
      <>
        {items &&
          items.map((item, index) => (
            <ItemStyle key={index}>
              <Item 
              name={item.key} 
              value={item.val.value}
              onBuyClick={() => onBuyClick(item.id)}
              />
            </ItemStyle>
          ))}
      </>
    );
  }
};
