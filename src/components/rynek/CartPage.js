import React from 'react';
import {TextBlock} from "./TextBlock"

import styled from "styled-components";
import { Item } from "./Item";
export const CartPage = (items) => {
    if (items.length === 0) {
        return <TextBlock>Nie masz przedmiotów w koszyku</TextBlock>;
      } else {
        return (
          <>
          <TextBlock>Koszyk test</TextBlock>
            {/* {items &&
              items.map((item, index) => (
                <ItemStyle key={index}>
                  <Item 
                  name={item.key} 
                  value={item.val.value}
                  onBuyClick={() => {
                    if (item.type) {
                      onBuyClick(item.key)
                    }
                  }}
                  />
                </ItemStyle>
              ))} */}
          </>
        );
      };
}


const ItemStyle = styled.div`
  height: max-content;
  width: "100%";
  justify-content: space-around;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  padding: 0 5px;
  min-width: 95px;
  min-height: 110px;
`;
export const Items = ({ items, onBuyClick }) => {
  console.log(items);


};
