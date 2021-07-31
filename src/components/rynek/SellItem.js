import React from "react";
import { TextBlock } from "./TextBlock";

import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";

const IconStyle = styled.img`
  max-height: 100px;
  max-width: 100px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  margin: 0px 10px;
`;
const src =
  "https://firebasestorage.googleapis.com/v0/b/monster-hunt-v1.appspot.com/o/test-avatar%2Fmiecz.png?alt=media&token=35f91573-72ea-4732-86c9-f954c8541b46";

export const SellItem = ({
  name,
  value,
  icon,
  deleteButton,
}) => {
  return (
    <>
      <div>
        {/* <IconStyle src={icon} alt=""></IconStyle> */}
        <IconStyle src={src} alt=""></IconStyle>
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
        <div style={{ display: "flex", justifyContent:"flex-end", padding: "0 20px" }}>
          <TextBlock style={{ fontSize: "20px" }}>
            wartość: {value}
          </TextBlock>
        </div>
      </div>
    </>
  );
};
