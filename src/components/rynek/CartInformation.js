import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { styled } from "@material-ui/core/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const CartInformation = ({ productCount, totalValue }) => {
  if (productCount === 0) {
    return <></>;
  } else {
    return (
        <>
      <IconButton aria-label="cart" style={{ float: "right" }}>
        <StyledBadge badgeContent={productCount} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <div>{totalValue}</div>
      </>
    );
  }
};
