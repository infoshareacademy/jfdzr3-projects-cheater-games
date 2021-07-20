import "./auth.css";
import { auth } from "../firebaseConfig";
import { useHistory } from "react-router-dom";

export const Logout = () => {
  const history = useHistory();

  const logoutClick = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };

  return <div onClick={logoutClick}>Wyloguj</div>;
};
