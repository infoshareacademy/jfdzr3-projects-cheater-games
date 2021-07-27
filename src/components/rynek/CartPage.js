import React from 'react';
import {TextBlock} from "./TextBlock"

import styled from "styled-components";
import { CartItem } from "./CartItem";
import { BuyButton } from "./BuyButton";
import { Item } from "./Item";



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

export const CartPage = ({itemsToDisplayInCart, subtractFromCart, addToCart, totalPrice, resetCart, userItemsRef}) => {
   
        return (
          <>
          {itemsToDisplayInCart.length === 0 ? (
            <>
              <TextBlock>Nie masz przedmiotów w koszyku</TextBlock>
            </>
          ) : (
            <>
              <TextBlock>Koszyk</TextBlock>
              <List>
                {itemsToDisplayInCart.map((item, index) => {
                  return (
                    <ItemCartStyle style={{ marginTop: "30px" }}>
                      <CartItem
                        key={index}
                        name={item.key}
                        orderCount={item.orderCount}
                        value={item.val.value}
                        icon={item.val.icon}
                        onAddButton={() => addToCart(item.key)}
                        onMinusButton={() => subtractFromCart(item.key)}
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
                <BuyButton
                  resetCart={resetCart}
                  updatedUserItems={itemsToDisplayInCart}
                  totalPrice={totalPrice}
                  userArmoryBeforeBuy={userItemsRef}
                />
              </>
            )}
          </BuyButtonSection>
          </>
        );
}

