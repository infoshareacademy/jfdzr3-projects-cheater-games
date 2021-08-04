import React from "react";
import Chip from "@material-ui/core/Chip";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import { GiSwapBag } from "react-icons/gi";
import { useCart } from "./CartContext";
import { useUser } from "../../hooks/useUser";


export const Item = ({ name, value, icon, onBuyClick, onSellClick }) => {
const {getTotalPrice} = useCart();
const totalPrice = getTotalPrice();
const user = useUser();
const userGold = user?.resources.gold;

  return (
    <>
      <h5>{name}</h5>
      <img src={icon} style={{ height: "70px" }} alt="" />
      {onSellClick && (
        <button onClick={() => onSellClick()} disabled={userGold < totalPrice}>
          <Chip
            label={value}
            icon={<GiSwapBag style={{ color: "#0e79b2" }} />}
            variant="outlined"
            size="small"
            style={{
              fontWeight: "500",
              color: "#0e79b2",
              border: "transparent",
            }}
          />
        </button>
      )}
      {onBuyClick && (
        <button onClick={() => onBuyClick()} disabled={value === 500}>
          <Chip
            label={value}
            icon={<ShoppingCartRoundedIcon style={{ color: "green" }} />}
            variant="outlined"
            size="small"
            style={{
              fontWeight: "500",
              color: "green",
              border: "transparent",
            }}
          />
        </button>
      )}
    </>
  );
};
