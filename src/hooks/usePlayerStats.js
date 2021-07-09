import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

export const usePlayerStats = (user) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user === null) {
      setStats(null);
      return;
    }
    return db
      .collection("stats")
      .doc(user)
      .onSnapshot((doc) => {
        console.log(doc.data());
      });
  }, [stats]);

  return stats;
};
