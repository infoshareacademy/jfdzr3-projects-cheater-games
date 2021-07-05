import "./auth.css";
import React from "react";
import {
  Link, useHistory,
} from "react-router-dom";
import { useState } from "react";
import firebaseApp from "../firebaseConfig";




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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    firebaseApp
      .auth()
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
              name="current-password"
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
          <p>{error}</p>
        </div>
      </div>
    </>
  );
};
