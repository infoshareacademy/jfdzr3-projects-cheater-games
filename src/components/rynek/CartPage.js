import React, { useState } from "react";
import { TextBlock } from "./TextBlock";
import styled from "styled-components";
import { CartItem } from "./CartItem";
import { BuyButton } from "./BuyButton";
import { useCart } from "./CartContext";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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

export const CartPage = () => {
  const {
    getCartItems,
    getCartItemsGroupedByKey,
    getTotalPrice,
    addToCart,
    subtractFromCart,
  } = useCart();

  const cartItems = getCartItems();

  const itemsByKey = getCartItemsGroupedByKey();

  const cartRows = Object.entries(itemsByKey)
    .map(([key, [firstItem]]) => {
      return {
        key,
        item: firstItem,
        quantity: itemsByKey[key].length,
      };
    })
    .sort((a, b) => (a.key > b.key ? 1 : -1));

  const totalPrice = getTotalPrice();

  const [open, setOpen] = useState(false);
  const handleClick = () => {
      setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <>
          <TextBlock>Nie masz przedmiotów w koszyku</TextBlock>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Dodaliśmy przedmioty do Twojej kolekcji"
            action={
              <>
                <Button color="secondary" size="small" onClick={handleClose} > sukces
                </Button>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
          />
        </>
      ) : (
        <>
          <TextBlock>Koszyk</TextBlock>
          <List>
            {cartRows.map(({ key, item, quantity }) => {
              return (
                <ItemCartStyle style={{ marginTop: "30px" }} key={key}>
                  <CartItem
                    name={key}
                    orderCount={quantity}
                    value={item.val.value}
                    icon={item.val.icon}
                    onAddButton={() => addToCart(item)}
                    onMinusButton={() => subtractFromCart(key)}
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
            <BuyButton handleClick={handleClick}/>
          </>
        )}
      </BuyButtonSection>
    </>
  );
};
