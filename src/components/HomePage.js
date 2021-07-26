import "../auth/auth.css";
import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { SelectRace } from "./SelectRace";
import { GlobalChat } from "../global-chat/global-chat";
import { Login } from "../auth/Login"
import { auth, db } from "../firebaseConfig";

export const HomePage = () => {
  const user = useUser();

  const [itemData, setItemData] = useState({})
  const [itemStats, setItemStats] = useState({})
  const [itemSuffix, setItemSuffix] = useState({})
  const [itemPrefix, setItemPrefix] = useState({})

  // const getItemData = () => {
  useEffect(() => {
    db.collection("users").doc(user?.uid).collection("armory").doc("210701182001200").onSnapshot((item) => {
      setItemData({
        name: item.data()?.name,
        prefix: item.data()?.Prefix,
        suffix: item.data()?.Suffix,
        quality: item.data()?.quality,
        type: item.data()?.type,
      })
    })
  }, [user])

  useEffect(() => {
    db.collection("items").doc(itemData?.type).onSnapshot((stats) => {
      if (stats === undefined) {
        console.log("Loading")
      }
      setItemStats(stats.data()[itemData?.name]);
    })
  }, [itemData])

useEffect(() => {
  db.collection("items").doc(`${itemData?.type}Suffix`).onSnapshot((stats) => {
    if (stats === undefined) {
      console.log("Loading")
    }
    setItemSuffix(itemData?.suffix === "" ? stats.data()["none"] : stats.data()[itemData?.suffix]);
  })
}, [itemData])

useEffect(() => {
  db.collection("items").doc(`${itemData?.type}Prefix`).onSnapshot((stats) => {
    if (stats === undefined) {
      console.log("Loading");
    }
    setItemPrefix(itemData?.prefix === "" ? stats.data()["none"] : stats.data()[itemData?.prefix]);
  })
}, [itemData])

  const qualityDisplay = () => {
    if (itemData.quality === 1) {
      return;
    }
    else if (itemData.quality === 1.5) {
      return "Dobry";
    }
    else if (itemData.quality === 2.5) {
      return "Doskonały";
    }
  }


  
  // const handleHover = (e) => {

  //   <div style={{position: "absolute", left: "50%", top: "50%", width: "400px", height: "200px"}}>{itemData?.suffix}</div>
  // }

  // onMouseOver={handleHover}

const displayingQuality = qualityDisplay();

  return (
    <>
      {user !== null ? (
        <>
          <h1 className="welcome">Witaj w grze {user?.name}</h1>
          <div>
          <div>Masz mój miecz:</div>
          <div>Nazwa: <span>{displayingQuality} {itemData?.prefix} {itemData?.name} {itemData?.suffix}</span></div>
          <div>Wartość przedmiotu: {itemData.quality * (itemStats?.value + itemSuffix?.value + itemPrefix?.value)} golda</div>
          </div>
          {user?.race === undefined ? <SelectRace /> : <GlobalChat />}
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
};
