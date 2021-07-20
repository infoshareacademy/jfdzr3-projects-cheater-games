import React from "react";
import Chip from "@material-ui/core/Chip";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";

export const Item = ({ name, value, onBuyClick }) => {
  return (
    <>
      <h5>{name}</h5>
      <h6 style={{ marginTop: "5px" }}>gold: {value}</h6>
      <Chip
        label={value}
        icon={<ShoppingCartRoundedIcon style={{ color: "green" }} />}
        variant="outlined"
        size="small"
        style={{
          marginTop: "10px",
          color: "green",
          borderColor: "green",
          alignSelf: "flex-end",
        }}
        onClick={() => onBuyClick()}
      />
    </>
  );
};