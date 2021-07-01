import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useEffect, createContext } from "react";
import { useHitPoints } from "../hooks/useHitPoints";
import { useUser } from "../hooks/useUser";

export const FightBar = (props) => {
//   const [hitEffect, setHitEffect] = useState("");
  
  const handleClick = () => {
      const random = Math.floor(Math.random() * 100);
      if (random < 80) {
        console.log("Hit");
      } else {
        console.log("Miss");
        props.sendToParent(props.toChild-20);
      }
    //   return hitEffect;
    };

  return <button onClick={handleClick}>Hit me!</button>;
};
