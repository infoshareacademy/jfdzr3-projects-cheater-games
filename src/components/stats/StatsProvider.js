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
        if (doc.exists) {
          const { stats } = doc.data();
          setPoints(stats);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);
  return (
    <StatsContext.Provider value={[points, setPoints]}>
      {children}
    </StatsContext.Provider>
  );
}
