import { useContext } from "react";
import { StatsContext } from "./StatsProvider";
import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";

export function Form({ children }) {
  const user = useUser();
  const [points] = useContext(StatsContext);
  const addPointsToDatabase = (e) => {
    e.preventDefault();
    db.collection("users").doc(user?.uid).set(points);
  };
  return (
    <form className="user-stats__form" onSubmit={addPointsToDatabase}>
      {children}
    </form>
  );
}
