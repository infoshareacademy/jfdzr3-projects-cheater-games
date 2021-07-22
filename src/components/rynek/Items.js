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
                icon={item.val.icon}
                name={item.key}
                value={item.val.value}
                onBuyClick={() => {
                  if (
                    item.type === "test" ||
                    item.type === "handWeapon" ||
                    item.type === "handWeapon" ||
                    item.type === "armor" ||
                    item.type === "armorPrefix" ||
                    item.type === "armorSuffix" ||
                    item.type === "handWeaponPrefix" ||
                    item.type === "handWeaponSuffix" ||
                    item.type === "helmet" ||
                    item.type === "helmetPrefix" ||
                    item.type === "helmetSuffix"
                  ) {
                    onBuyClick(item.key);
                  }
                }}
              />
            </ItemStyle>
          ))}
      </>
    );
  }
};
