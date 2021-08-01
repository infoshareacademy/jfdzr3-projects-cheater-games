import React from "react";
import { TextBlock } from "./TextBlock";
import styled from "styled-components";
import { SellItem } from "./SellItem";
import { BuyButton } from "./BuyButton";
import { useCart } from "./CartContext";

const List = styled.ul`
  list-style: none;
  margin: 0 25px;
`;
const ItemCartStyle = styled.section`
  display: flex;
  height: max-content;
  width: "100%";
  justify-content: left;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  padding: 0 5px;
  min-width: 95px;
  min-height: 120px;
  align-items: center;
`;

const BuyButtonSection = styled.section`
  display: grid;
  justify-items: right;
  float: right;
  margin-right: 50px;
`;

export const SellPage = () => {
  const {
    getSellCartItems,
    getSellCartItemsGroupedByKey,
    getTotalSellPrice,
    deleteFromSellPage
  } = useCart();

const sellItems = getSellCartItems()
  console.log(sellItems);


  const totalPrice = getTotalSellPrice();

  return (
    <>
      {sellItems.length === 0 ? (
          <TextBlock>Nie wybrałeś jeszcze przedmiotów</TextBlock>
      ) : (
        <>
          <TextBlock>Twój ekwipunek na sprzedaż</TextBlock>
          <List>
            {sellItems.map((item) => {
              return (
                <ItemCartStyle style={{ marginTop: "30px" }} key={item.id}>
                  <SellItem
                    name={item.key}
                    value={item.val.value}
                    icon={item.val.icon}
                    deleteButton={() => deleteFromSellPage(item.id)}
                  />
                </ItemCartStyle>
              );
            })}
          </List>
        </>
      )}
      <BuyButtonSection>
        {totalPrice === 0 ? (
          <></>
        ) : (
          <>
            <TextBlock>Razem: {totalPrice}</TextBlock>
            <BuyButton />
          </>
        )}
      </BuyButtonSection>
    </>
  );
};
