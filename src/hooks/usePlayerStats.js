import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

export const usePlayerStats = (user) => {
  const [stats, setStats] = useState(null);

  const uid = user?.uid;

  useEffect(() => {
    if (!uid) {
      setStats(null);
      return;
    }
    return db
      .collection("stats")
      .doc(uid)
      .onSnapshot((doc) => {
        console.log(doc.data());
      });
  }, [uid]);

  return stats;
};
