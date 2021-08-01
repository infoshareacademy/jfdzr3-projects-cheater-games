import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { styled } from "@material-ui/core/styles";
import s from "styled-components";
import { useUser } from "../../hooks/useUser";
import { TextBlock } from "./TextBlock";
import { useCart } from "./CartContext";
import { GiSwapBag } from "react-icons/gi";


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const CartInfoWrapper = s.div`
  display: flex;
  width: 40%;
  float: right;
  transform: scale3d(0.95, 0.95, 1);
  justify-content: space-between;
`;
const SellInfoWrapper = s.div`
display: flex;
  width: 40%;
  float: left;
  transform: scale3d(0.95, 0.95, 1);
  justify-content: space-between;
`;

export const CartInformation = ({ openModal, openSellPageModal }) => {
  const user = useUser();
  const { getCartItems ,getSellCartItems, getTotalPrice } = useCart();

  const numberOfItemsInCart = getCartItems().length;
  const numberOfItemsInSellCart = getSellCartItems().length;

  const totalPrice = getTotalPrice();

  if (!user) {
    return (
      <CartInfoWrapper>
        <TextBlock>Ładuję Twoje dane...</TextBlock>
      </CartInfoWrapper>
    );
  }

  return (
    <div> 
      <SellInfoWrapper>
      <div onClick={openSellPageModal}>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={numberOfItemsInSellCart} color="secondary">
            <GiSwapBag />
          </StyledBadge>
        </IconButton>
        {/* <div>{totalPrice}</div> */}
      </div>
      {/* <TextBlock>Twoje złoto: {user?.resources.gold}</TextBlock> */}
    </SellInfoWrapper>
      
    <CartInfoWrapper>
      <TextBlock>Twoje złoto: {user?.resources.gold}</TextBlock>
      <div onClick={openModal}>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={numberOfItemsInCart} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        {/* <div>{totalPrice}</div> */}
      </div>
    </CartInfoWrapper>
    </div>
  );
};
