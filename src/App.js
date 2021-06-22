import React from "react";
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
import { HuntingScreen } from "./components/HuntingScreen";

import { HomePage } from "./components/HomePage";
import { Registration } from "./auth/Registration";
import { Login } from "./auth/Login";

function App() {
  const authUser = useFirebaseAuthentication(firebase);

  return (
    <>
      <header className="header">
        <img src="./logo-monster-hunt.png" alt="" className="logo" />
      </header>
      <Router>
        {authUser ? (
          <Switch>
            <Route path="/hunt">
              <HuntingScreen />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/register">
              <RegistrationPage />
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegistrationPage />
            </Route>
          </Switch>
        )}
      </Router>
    </>
  );
}

export default App;
