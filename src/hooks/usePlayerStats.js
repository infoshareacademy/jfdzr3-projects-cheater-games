import firebase from "firebase/app";
import { useEffect, useState } from "react";

export const usePlayerStats = (user) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user === null) {
      setStats(null);
      return;
    }
    return firebase
      .firestore()
      .collection("stats")
      .doc(user)
      .onSnapshot((doc) => {
        console.log(doc.data());
      });
  }, [stats]);

  return stats;
};
