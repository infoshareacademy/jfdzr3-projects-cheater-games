import React from "react";
import { useShowItems } from "../../hooks/useShowItems";
import styled from "styled-components";
import {TextBlock} from "../rynek/TextBlock"

const Wrapper = styled.div`
display: flex;
flex-flow: row;
margin: 10px 10px 0 10px;
box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
width: 98%;

`;
export const ShowItem = ({ itemID }) => {
  const item = useShowItems(itemID);
console.log(item);



  return (
    <>
      {item.itemData ? (
        <Wrapper>
          <div style={{padding: "0"}}>
            <img
              src={item.weaponIcon}
              style={{
                width: "100px",
                height: "150px",
                boxShadow: "0 3px 7px rgba(0, 0, 0, 0.5)",
              }} alt="" />
          </div>
          <div style={{minWidth: "750px", }}>
            <TextBlock >
              <span > 
                {item.displayingQuality} {item.itemData?.prefix}{" "}
                {item.itemData?.name} {item.itemData?.suffix}
              </span>
            </TextBlock>
            <div style={{marginLeft: "20px"}}>
            <div style={{textWeight: "bold"}}>
              Wartość przedmiotu:{" "}
              {item.itemData.quality *
                (item.itemStats?.value +
                  item.itemSuffix?.value +
                  item.itemPrefix?.value)}{" "}
              golda
            </div>
            <div>
              Obrażenia: {parseInt(item.itemData?.quality * item.weaponDmgLow)}
              {"-"} {parseInt(item.itemData?.quality * item.weaponDmgUpp)}
            </div>
            {/* <div>
              Cechy
              {item.fullItemStatsArray === ["Loading"]
                ? item.fullItemStatsArray
                : item.fullItemStatsArray
                    .sort(item.fullItemStatsArray?.name)
                    .filter((el) => {
                      if (
                        el?.name === "icon" ||
                        el?.name === "value" ||
                        el?.name === "dmgLow" ||
                        el?.name === "dmgUpp"
                      ) {
                        return false;
                      } else {
                        if (el?.value === 0 || el?.value === undefined) {
                          return false;
                        }
                      }
                      return true;
                    })
                    .map((el, index) => {
                      return (
                        <>
                        <span key={index} >
                          {item.unitsMap[el?.name]?.label || el?.name}:{" + "}
                          {parseInt(item.itemData?.quality * el?.value)},{" "}
                        </span>
                        

</>

                      );
                    })}
            </div> */}
            </div>
          </div>
        </Wrapper>
      ) : null}
    </>
  );
};
