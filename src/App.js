import { React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { LoginPage } from "./components/LoginPage";
import { RegistrationPage } from "./components/RegistrationPage";
import { HuntingScreen } from "./components/HuntingScreen";

import { SelectRace } from "./components/SelectRace";
import { HomePage } from "./components/HomePage";
import { MainMenu } from "./components/MainMenu";
import { useUser } from "./hooks/useUser";

function App() {
  const user = useUser();

  return (
    <Router>
      <header className="header">
        <img src="./logo-monster-hunt.png" alt="" className="logo" />
      </header>
      <div className="content">
        <MainMenu />
        <main className="main__section">
          {user ? (
            user === null || user.race === undefined ? (
              <Route path="/">
                <SelectRace />
              </Route>
            ) : (
              <Switch>
                <Route path="/hunt">
                  <HuntingScreen />
                </Route>
                <Route path="/">
                  <HomePage />
                </Route>
              </Switch>
            )
          ) : (
            <Switch>
              <Route path="/register">
                <RegistrationPage />
              </Route>
              <Route path="/">
                <LoginPage />
              </Route>
            </Switch>
          )}
        </main>
        <aside className="advertising"></aside>
      </div>
    </Router>
  );
}

export default App;
