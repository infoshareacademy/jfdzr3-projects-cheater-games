import "./auth.css";
import firebaseApp from "../firebaseConfig";
import { HuntingScreen } from "./HuntingScreen";

export const GoHunt = () => {
  return (
    <>
      <li onClick={HuntingScreen}>Idź na polowanie</li>
    </>
  );
};
