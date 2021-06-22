import "./auth.css";
import firebaseApp from "../firebaseConfig";

export const Logout = () => {
  const logoutClick = () => {
    firebaseApp.auth().signOut();
    console.log("Wylogowano");
  };

  return (
    <>
      <div id="logout" data-auth-visibility="true" onClick={logoutClick}>
        Log Out
      </div>
    </>
  );
};
