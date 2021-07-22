import React from "react";
import { TextBlock } from "./TextBlock";
import { ItemStyle } from "./Items";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

export const CartItem = ({name, itemKey, value, orderCount}) => {
  return (
      <>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>{name}</h2>
        <TextBlock>wartość: {value * orderCount}</TextBlock>
      </div>
      {/* <button onClick={(key) => addToCart(key)}> */}
      <button onClick={() => console.log("odejmij z koszyka")}>
        <RemoveIcon
          style={{
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.5)",
            marginRight: "10px",
          }}
        />
      </button>
      <button onClick={() => console.log("dodaj do koszyka")}>
        <AddIcon style={{ boxShadow: "0 5px 10px rgba(0, 0, 0, 0.5)" }} />
      </button>
</>
  ); 
};
