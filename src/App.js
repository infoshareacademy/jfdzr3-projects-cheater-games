import { Registration } from "./auth/Registration";
import { Login } from "./auth/Login";
import { Logout } from "./auth/Logout";
import firebase from "firebase/app";

import useFirebaseAuthentication  from "./auth/useFirebaseAuthentication";

function App() {
  const authUser = useFirebaseAuthentication(firebase);


  return (
    <>
      <header className="header">
        <img src="./logo-monster-hunt.png" alt="" className="logo" />
      </header>
      <div className="content">
        <nav className="nav">
          <ul>
            <Logout />
            <li>Widok postaci</li>
            <li>Statystyki</li>
            <li>Quest</li>
            <li>Rynek</li>
            <li>Idź na polowanie</li>
          </ul>
        </nav>
        <main className="main__section">
          <Login />
          <Registration />
        </main>
        <aside className="advertising"></aside>
      </div>
    </>
  );
}

export default App;
