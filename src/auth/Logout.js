import "./auth.css";
import firebaseApp from "../firebaseConfig";
import { useHistory } from "react-router-dom";
export const Logout = () => {
  const history = useHistory();

  const logoutClick = () => {
    firebaseApp.auth().signOut();
    history.push("/");
  };

  return (
    <>
      <div id="logout" data-auth-visibility="true" onClick={logoutClick}>
        Log Out
      </div>
    </>
  );
};
