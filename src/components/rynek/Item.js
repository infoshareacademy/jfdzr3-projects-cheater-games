import React from "react";
import Chip from "@material-ui/core/Chip";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import { GiSwapBag } from "react-icons/gi";

export const Item = ({ name, value, icon, onBuyClick, onSellClick }) => {
  return (
    <>
      <h5>{name}</h5>
      <img src={icon} style={{ height: "70px" }} alt="" />
      {onSellClick && (
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
          onClick={() => onSellClick()}
        />
      )}
      {onBuyClick && (
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
          onClick={() => onBuyClick()}
        />
      )}
    </>
  );
};
