import { useContext } from "react";
import { StatsContext } from "./StatsProvider";
import { db } from "../../firebaseConfig";

export function Form({ uid, children }) {
  const [points] = useContext(StatsContext);
  const addPointsToDatabase = (e) => {
    e.preventDefault();
    db.collection("users").doc(uid).update({ stats: points });
  };
  return (
    <form className="user-stats__form" onSubmit={addPointsToDatabase}>
      {children}
    </form>
  );
}
