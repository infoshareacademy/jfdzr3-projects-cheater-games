import React from "react";
import { useShowItems } from "../../hooks/useShowItems";
import styled from "styled-components";

const Wrapper = styled.div`

`;
export const ShowItem = ({ itemID }) => {
  const item = useShowItems(itemID);

  return (
    <>
      {item.itemData ? (
        <Wrapper 
          style={{
            display: "flex",
            flexFlow: "row",
            alignItems: "center",
            // justifyContent: "space-between",
            margin: "10px 10px 0 10px",
            padding:"0px",
            boxShadow: "0 3px 7px rgba(0, 0, 0, 0.5)"

          }}
        >
          <div>
            <img
              src={item.weaponIcon}
              style={{
                width: "100px",
                height: "150px",
                // border: "1px solid black",
                boxShadow: "0 3px 7px rgba(0, 0, 0, 0.5)"

              }}
              alt=""
            />
          </div>
          <div style={{ width: "500px" }}>
            <div>
              Nazwa:{" "}
              <span>
                {item.displayingQuality} {item.itemData?.prefix}{" "}
                {item.itemData?.name} {item.itemData?.suffix}
              </span>
            </div>
            <div>
              Wartość przedmiotu:{" "}
              {item.itemData.quality *
                (item.itemStats?.value +
                  item.itemSuffix?.value +
                  item.itemPrefix?.value)}{" "}
              golda
            </div>
            <div>
              Obrażenia: {parseInt(item.itemData?.quality * item.weaponDmgLow)}{" "}
              {"-"} {parseInt(item.itemData?.quality * item.weaponDmgUpp)}
            </div>
            <div>
              Cechy:{" "}
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
                        if (el?.value === 0) {
                          return false;
                        }
                      }
                      return true;
                    })
                    .map((el, index) => {
                      return (
                        <span key={index}>
                          {item.unitsMap[el?.name]?.label || el?.name}:{" +"}
                          {parseInt(item.itemData?.quality * el?.value)},{" "}
                        </span>
                      );
                    })}
            </div>
          </div>
        </Wrapper>
      ) : null}
    </>
  );
};
