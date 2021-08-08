import { React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { RegistrationPage } from "./components/RegistrationPage";
import { HuntingScreen } from "./components/HuntingScreen";
import { HomePage } from "./components/HomePage";
import { MainMenu } from "./components/MainMenu";
import { Armory } from "./components/items/Armory";
import { AdminPanel } from "./components/AdminPanel";
import { StorePage } from "./components/rynek/StorePage";
import { Stats } from "./components/stats/Stats";
import { CharacterViewPage } from "./components/CharacterViewPage";
import { useUser } from "./hooks/useUser";
import { Chat } from "./components/global-chat/Chat";
import { AboutUsPage } from "./components/about/AboutUsPage";
import { Logo } from "./components/Logo";

function App() {
  const user = useUser();

  return (
    <Router>
      {user !== null ? (
        <div className="content content-with-sidebar">
          <MainMenu />
          <main>
            <Switch>
              <Route path="/character">
                <CharacterViewPage />
              </Route>
              <Route path="/store">
                <StorePage />
              </Route>
              <Route path="/hunt">
                <HuntingScreen />
              </Route>
              <Route path="/armory">
                <Armory />
              </Route>
              <Route path="/stats">
                <Stats />
              </Route>
              <Route path="/chat">
                <Chat />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/about">
                <AboutUsPage />
              </Route>
              {user?.role === "admin" && (
                <Route path="/admin">
                  <AdminPanel />
                </Route>
              )}
            </Switch>
          </main>
        </div>
      ) : (
        <div className="content content-auth">
          <main className="main__section-auth">
            <div>
              <div style={{ width: 300 }}>
                <Logo />
              </div>
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
            </div>
          </main>
        </div>
      )}
    </Router>
  );
}

export default App;
