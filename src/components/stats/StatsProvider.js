import { useState, useEffect, createContext } from "react";
import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";

export const StatsContext = createContext();

export function StatsProvider(props) {
  const [points, setPoints] = useState({});
  const user = useUser();
  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
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
      {props.children}
    </StatsContext.Provider>
  );
}
