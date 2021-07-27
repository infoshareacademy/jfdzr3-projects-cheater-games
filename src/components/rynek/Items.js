import styled from "styled-components";
import { Item } from "./Item";

export const ItemStyle = styled.div`
  height: max-content;
  width: "100%";
  justify-content: space-around;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  padding: 0 5px;
  min-width: 95px;
  min-height: 150px;
`;

export const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  grid-auto-rows: 150px;
  grid-gap: 10px;
`;

export const Items = ({ items, onBuyClick }) => {
  if (items.length === 0) {
    return <p>Brak przedmiotów</p>;
  }

  return (
    <Wrapper>
      {items &&
        items.map((item, index) => (
          <ItemStyle key={index}>
            <Item
              icon={item.val.icon}
              name={item.key}
              value={item.val.value}
              onBuyClick={() => onBuyClick(item)}
            />
          </ItemStyle>
        ))}
    </Wrapper>
  );
};
