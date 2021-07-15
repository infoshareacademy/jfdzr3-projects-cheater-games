import "./auth.css";
import React from "react";
import {
  Link, useHistory,
} from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebaseConfig";

const resetFormOnSubmit = (e) => {
  e.target.reset();
};

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    error: "",
  });

  const history = useHistory();

  const { email, password, error } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: "",
    });
    return user;
  };

  const translatedFirebaseErrors = {
    'auth/user-not-found': "Próbowano się zalogować do nieistniejącego konta. Przyczyn może być wiele: takiego konta nigdy nie było lub istniało, ale zostało skasowane.",
    'auth/too-many-requests': "Dostęp do konta został tymczasowo ograniczony z powodu wielokrotnych nieudanych prób zalogowania. Możesz odzyskać dostęp poprzez zresetowanie hasła albo spróbuj zalogować się później.",
    'auth/wrong-password': "Podane hasło jest błędne."
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((token) => {
        // createCharacter(token.user.uid, token.user.displayName);
        resetFormOnSubmit(e);  
        history.push("/")
   
      })
      .catch((error) => {
        console.log("error", error);
        setUser({
          ...user,
          error,
        });
      });
  };

  return (
    <>
      <div className="modal active">
        <h2>Zaloguj się</h2>
        <form
          className="registration__form login__form"
          id="logIn-form"
          onSubmit={handleOnSubmit}
        >
          <label htmlFor="logIn-email">
            Adres email:
            <input
              type="email"
              className="form__input"
              name="email"
              autoComplete="username email" 
              id="logIn-email"
              required
              onChange={handleChange}
            />
          </label>
          <label htmlFor="logIn-password">
            Hasło:
            <input
              type="password"
              className="form__input"
              autoComplete="current-password"
              name="password"
              id="logIn-password"
              required
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="myButton">
            Wejdź do gry!
          </button>
        </form>

        <div>
        Nie masz konta? <Link to="/register">Zarejestruj się</Link>
      
        </div>
              <div className="error"> 
              {error && <p>{translatedFirebaseErrors[error.code] || error.message}</p>}      
              </div>
        </div>
    </>
  );
};
