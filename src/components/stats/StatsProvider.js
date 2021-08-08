import { useState, useEffect, createContext } from "react";
import { db } from "../../firebaseConfig";

export const StatsContext = createContext();

export function StatsProvider({ uid, children }) {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        const { stats } = doc.data();
        setPoints(stats);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [uid, children]);
  return (
    <StatsContext.Provider value={[points, setPoints]}>
      {children}
    </StatsContext.Provider>
  );
}
