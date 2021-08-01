import "./auth.css";
import { auth, db } from "../firebaseConfig";
import { useHistory } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export const Logout = () => {
  const history = useHistory();
  const user = useUser();

  const logoutClick = () => {
    db.collection("users")
      .doc(user?.uid)
      .update({ isOnline: false })
      .then(() => {
        auth.signOut().then(() => {
          history.push("/");
        });
      })
      .catch((error) => console.log(error));
  };

  return <div onClick={logoutClick}>Wyloguj</div>;
};
