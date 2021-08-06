import React from "react";
import { TextBlock } from "./TextBlock";
import RemoveIcon from "@material-ui/icons/Remove";
import styled from "styled-components";

const IconStyle = styled.img`
  max-height: 100px;
  max-width: 100px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  margin: 0px 10px;
`;

export const SellItem = ({ name, value, icon, deleteButton }) => {
  return (
    <>
      <div>
        <IconStyle src={icon} alt=""></IconStyle>
      </div>
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "0 20px",
          }}
        >
          <TextBlock>{name}</TextBlock>
          <button onClick={() => deleteButton()}>
            <RemoveIcon
              style={{
                boxShadow: "0 5px 10px rgba(0, 0, 0, 0.5)",
              }}
            />
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0 20px",
          }}
        >
          <TextBlock style={{ fontSize: "20px" }}>złoto: {value}</TextBlock>
        </div>
      </div>
    </>
  );
};
