import { useContext } from "react";
import { StatsContext } from "./StatsProvider";
import { db } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";


export function Form({ uid, children }) {
  const [points] = useContext(StatsContext);
  const history = useHistory();
  const addPointsToDatabase = (e) => {
    e.preventDefault();
    db.collection("users").doc(uid).update({ stats: points }).then(() => {
      history.push("/character");
    });
  };
  return (
    <form className="user-stats__form" onSubmit={addPointsToDatabase}>
      {children}
    </form>
  );
}
