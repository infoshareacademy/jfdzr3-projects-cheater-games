import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import firebase from "firebase/app";
import useFirebaseAuthentication from "./auth/useFirebaseAuthentication";
import { LoginPage } from "./components/LoginPage";
import { RegistrationPage } from "./components/RegistrationPage";
import { SelectRace } from "./components/SelectRace";
import { HomePage } from "./components/HomePage";
import { Registration } from "./auth/Registration";
import { Login } from "./auth/Login";
import { Logout } from "./auth/Logout";

function App() {
  const authUser = useFirebaseAuthentication(firebase);
  const db = firebase.firestore();

  // console.log(authUser)

  const checkIfUserLoggedIn = () => {
    return firebase.auth().currentUser;
  };

  const user = checkIfUserLoggedIn();
  // console.log(user.uid);

  const getDocumentFromDB = () => {
    return db
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        return doc.data();
      });
  };

  const [document, setDocument] = useState([]);

  useEffect(() => {
    getDocumentFromDB().then((docFromDB) => {
      setDocument(docFromDB);
    });
  }, []);

  return (
    <>
      <header className="header">
        <img src="./logo-monster-hunt.png" alt="" className="logo" />
      </header>
      <Router>
        {authUser ? (
          <Switch>
            {!document.race ? (
              <Route path="/">
                <SelectRace />,
              </Route>
            ) : (
              <Route path="/">
                <HomePage />
              </Route>
            )}
          </Switch>
        ) : (
          <Switch>
            {/* <Route path="/race">
              <SelectRace />
            </Route> */}
            <Route path="/register">
              <RegistrationPage />
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        )}
      </Router>
    </>
  );
}

export default App;
