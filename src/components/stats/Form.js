import { useContext } from "react";
import { StatsContext } from "./StatsProvider";
import { useUser } from "../../hooks/useUser";
import { db } from "../../firebaseConfig";

export function Form(props) {
  const user = useUser();
  const [points] = useContext(StatsContext);
  const addPointsToDatabase = (e) => {
    e.preventDefault();
    db.collection("users").doc(user.uid).set(points);
  };
  return (
    <form className="user-stats__form" onSubmit={addPointsToDatabase}>
      {props.children}
    </form>
  );
}
