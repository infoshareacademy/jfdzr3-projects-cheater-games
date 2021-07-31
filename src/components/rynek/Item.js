import React from "react";
import Chip from "@material-ui/core/Chip";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import { GiSwapBag } from "react-icons/gi";

const src =
  "https://firebasestorage.googleapis.com/v0/b/monster-hunt-v1.appspot.com/o/test-avatar%2Fmiecz.png?alt=media&token=35f91573-72ea-4732-86c9-f954c8541b46";

export const Item = ({ name, value, onBuyClick, onSellClick }) => {
  return (
    <>
      <h5>{name}</h5>
      <img src={src} style={{ height: "70px" }} alt="" />
      {/* <h6 style={{ marginTop: "5px" }}>gold: {value}</h6> */}
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
          onClick={() => onBuyClick()}
        />
      )}
      {onBuyClick && (
        <Chip
          label={value}
          icon={<ShoppingCartRoundedIcon style={{ color: "green" }} />}
          variant="outlined"
          size="small"
          style={{
            fontWeight: "400",
            color: "green",
            border: "transparent",
            // borderColor: "green",
          }}
          onClick={() => onBuyClick()}
        />
      )}
    </>
  );
};
