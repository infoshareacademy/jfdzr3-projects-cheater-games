import React from "react";
import Chip from "@material-ui/core/Chip";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import { GiSellCard } from "react-icons/gi";
const src =
  "https://firebasestorage.googleapis.com/v0/b/monster-hunt-v1.appspot.com/o/test-avatar%2Fmiecz.png?alt=media&token=35f91573-72ea-4732-86c9-f954c8541b46";

export const UserItem = ({ name, value, onSellClick }) => {
  return (
    <>
      <h5>{name}</h5>
      {/* <GiBroadsword style={{width: "80px"}}/> */}
      <img src={src} style={{ height: "70px" }} alt=""/>
      <h6>gold: {value}</h6>
      {/* <h6 style={{ marginTop: "5px" }}>gold: {value}</h6> */}
      
      {onSellClick && <>
      <GiSellCard />
      {/* <Chip
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
        onClick={() => onSellClick()}
      />  */}
      </>}
    </>
  );
};
