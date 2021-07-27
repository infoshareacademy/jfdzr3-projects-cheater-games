import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { styled } from "@material-ui/core/styles";
import s from 'styled-components'
import { useUser } from "../../hooks/useUser";
import { TextBlock } from "./TextBlock";

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

export const CartInformation = ({ orderCount, totalValue, openModal }) => {
  const user = useUser();

  if (!user) {
    return (
      <CartInfoWrapper>
        <TextBlock>Ładuję Twoje dane...</TextBlock>
      </CartInfoWrapper>
    );
  }

  return (
    <CartInfoWrapper>
      <TextBlock>Twoje złoto: {user?.resources.gold}</TextBlock>
      <div onClick={() => openModal()}>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={orderCount} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        <div>{totalValue}</div>
      </div>
    </CartInfoWrapper>
  );
};
