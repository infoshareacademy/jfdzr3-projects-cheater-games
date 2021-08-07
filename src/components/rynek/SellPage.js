import React, {useState} from "react";
import { TextBlock } from "./TextBlock";
import styled from "styled-components";
import { SellItem } from "./SellItem";
import { SellButton } from "./SellButton";
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

export const SellPage = () => {
  const { getSellCartItems, getTotalSellPrice, deleteFromSellPage } = useCart();

  const sellItems = getSellCartItems();
  const totalPrice = getTotalSellPrice();

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
      {sellItems.length === 0 ? (
        <><TextBlock>Nie masz przedmiotów na sprzedaż</TextBlock>
        <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Sprzedałeś swój ekwipunek handlarzowi"
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
            <TextBlock>Wartość w złocie: {totalPrice}</TextBlock>
            <SellButton handleClick={handleClick}/>
          </>
        )}
      </BuyButtonSection>
    </>
  );
};
