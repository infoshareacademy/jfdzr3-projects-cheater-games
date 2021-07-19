import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { styled } from "@material-ui/core/styles";
import {Link} from "react-router-dom"
import {CartPageLink} from "../CartPageLink"
import {CartPage} from "./CartPage"
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const CartInformation = ({ orderCount, totalValue }) => {
  return (
    <Link to="/koszyk"  >
      <div>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={orderCount} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        <div>{totalValue}</div>
      </div>
    </Link>
  );
};
