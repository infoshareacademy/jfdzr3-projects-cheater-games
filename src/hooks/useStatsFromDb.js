import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { useUser } from "./useUser";

export const useStatsFromDb = () => {
  const user = useUser();

  const [raceStats, setRaceStats] = useState({});

  useEffect(() => {
    if (!user?.uid) {
      return;
    } else {
      return db
        .collection("races")
        .doc(user?.race)
        .onSnapshot((stats) => {
          setRaceStats({
            agi: stats.data()?.agi,
            str: stats.data()?.str,
            tough: stats.data()?.tough,
            vit: stats.data()?.vit,
            int: stats.data()?.int,
            perc: stats.data()?.perc,
            speed: stats.data()?.speed,
            def: stats.data()?.def,
          });
        });
    }
  }, [user]);
  return raceStats;
};
