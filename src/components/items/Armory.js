import "../../auth/auth.css";
import React from "react";
import { useUserItems } from "../../hooks/useUserItems";
import { ShowItem } from "./ShowItem";
import styled from "styled-components";

const ArmoryWrapper = styled.div`
display: grid;
  align-content: start;
  width: 100%;
  max-width: 900px;
  height: 100%;
  margin-top: 60px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
`;

export const Armory = () => {
  
  const userItemCollection = useUserItems();

  const result = [];

  if (userItemCollection === undefined) {
    return;
  } else {
    const map = new Map();
    for (const item of userItemCollection) {
      if (!map.has(item.id)) {
        map.set(item.id, true);
        result.push(item.id);
      }
    }
  }

  return (
    <>
      <h1 style={{textAlign: "center"}}>Zbrojownia</h1>
      {/* <GenerateItem /> */}

      <ArmoryWrapper>
        {result.map((itemID) => {
          return <ShowItem itemID={itemID} key={itemID} />;
        })}
      </ArmoryWrapper>
    </>
  );
};
