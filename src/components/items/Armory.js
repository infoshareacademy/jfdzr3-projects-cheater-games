import "../../auth/auth.css";
import React from "react";
import { useUserItems } from "../../hooks/useUserItems";
import { ShowItem } from "./ShowItem";
import s from 'styled-components'

const Layout = s.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  justify-content: space-between;

  > div {
    width: 45%;
    background: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }
`

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
    <div style={{ padding: 40 }}>
      <h1>Zbrojownia</h1>
      <Layout>
        {result.map((itemID) => {
          return <ShowItem itemID={itemID} key={itemID} />;
        })}
      </Layout>
    </div>
  );
};
