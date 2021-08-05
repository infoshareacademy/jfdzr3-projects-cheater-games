import { WrapText } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { useShowItems } from "../../hooks/useShowItems";
import { useUser } from "../../hooks/useUser";

export const ShowItem = ({ itemID }) => {
  const user = useUser();
  const item = useShowItems(itemID);

  return (
    <>
      {item.itemData ? (
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            alignItems: "center",
            justifyContent: "space-around",
            // width: "500px",
            margin: "0 auto",
          }}
        >
          <div style={{flexGrow: "1"}}>
            <img
              src={item.weaponIcon}
              style={{
                width: "100px",
                height: "150px",
                border: "1px solid black",
              }}
            />
            </div>
          <div style={{width: "500px"}}>
            <div>
              Nazwa:{" "}
              <span>
                {item.displayingQuality} {item.itemData?.prefix} {item.itemData?.name}{" "}
                {item.itemData?.suffix}
              </span>
            </div>
            <div>
              Wartość przedmiotu:{" "}
              {item.itemData.quality *
                (item.itemStats?.value + item.itemSuffix?.value + item.itemPrefix?.value)}{" "}
              golda
            </div>
            <div>
              Obrażenia: {parseInt(item.itemData?.quality * item.weaponDmgLow)} {"-"}{" "}
              {parseInt(item.itemData?.quality * item.weaponDmgUpp)}
            </div>
            <div>
              Cechy:{" "}
              {item.fullItemStatsArray === ["Loading"]
                ? item.fullItemStatsArray
                : item.fullItemStatsArray
                    .sort(item.fullItemStatsArray?.name)
                    .map((el) => {
                      if (
                        el?.name === "icon" ||
                        el?.name === "value" ||
                        el?.name === "dmgLow" ||
                        el?.name === "dmgUpp"
                      ) {
                        return;
                      } else {
                        if (el?.value === 0) {
                          return;
                        } else {
                          return (
                            <span key={el?.name}>
                              {item.unitsMap[el?.name]?.label || el?.name}:{" +"}
                              {parseInt(item.itemData?.quality * el?.value)},{" "}
                            </span>
                          );
                        }
                      }
                    })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
