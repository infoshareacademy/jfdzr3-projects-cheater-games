import { useState, useEffect } from "react";
import firebase from "firebase/app";
import { Logout } from "../auth/Logout";
import {
  Link,
} from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { usePlayerStats } from "../hooks/usePlayerStats";

export const AgilityTrial = () => {
    const user = useUser();

    const stats = usePlayerStats(user);

  if(stats === null) {
    return <div>Czekam na dane</div>
  }

    console.log(user);
    console.log(stats);
    return <></>;
}