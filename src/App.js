import { React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { LoginPage } from "./components/LoginPage";
import { RegistrationPage } from "./components/RegistrationPage";
import { HuntingScreen } from "./components/HuntingScreen";

import { HomePage } from "./components/HomePage";
import { MainMenu } from "./components/MainMenu";
import { useUser } from "./hooks/useUser";
import { AgilityTrial } from "./components/AgilityTrial";
import { AdminPanel } from "./components/AdminPanel";
import { Stats } from "./components/stats/Stats";

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
          {user !== null ? (
            <Switch>
              <Route path="/hunt">
                <HuntingScreen />
              </Route>
              <Route path="/agi">
                <AgilityTrial />
              </Route>
              <Route path="/stats">
                <Stats />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
            </Switch>
          ) : (
            <Switch>
              
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/register">
                <RegistrationPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
            </Switch>
          )}
          {user?.role === "admin" ? (
            <Switch>
              <Route path="/admin">
                <AdminPanel />
              </Route>
            </Switch>
          ) : (
            <></>
          )}
        </main>
        <aside className="advertising"></aside>
      </div>
    </Router>
  );
}

export default App;
