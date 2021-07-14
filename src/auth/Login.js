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
    'There is no user record corresponding to this identifier. The user may have been deleted.': "Próbowano się zalogować do nieistniejącego konta. Przyczyn może być wiele: takiego konta nigdy nie było lub istniało, ale zostało skasowane.",
    'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.': "Dostęp do konta został tymczasowo ograniczony z powodu wielokrotnych nieudanych prób zalogowania. Możesz odzyskać dostęp poprzez zresetowanie hasła albo spróbuj zalogować się później.",
    'The password is invalid or the user does not have a password.': "Podane hasło jest błędne."
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
          error: error.message,
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
         {error && <p>{translatedFirebaseErrors[error] || error}</p>}      

         </div>
{/* 
        <div className="error">
          <p>{error}</p>
        </div> */}

        </div>
    </>
  );
};
