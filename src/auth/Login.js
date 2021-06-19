import "./auth.css";
import { useState } from "react";
import firebase from "firebase/app";
import firebaseApp from "../firebaseConfig";

const db = firebase.firestore();
const createCharacter = (uid, nickname) => {
  return db.collection("users").doc(uid).set({
    exp: 0,
    nextLevel: 100,
    name: nickname,
  });
};

const resetFormOnSubmit = (e, user) => {
  e.target.reset();
};

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    error: "",
  });

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
        console.log(token.user);
        console.log(token.user.displayName);
        alert(`Witaj w grze ${token.user.displayName}`);
        createCharacter(token.user.uid, token.user.displayName);
        resetFormOnSubmit(e);
        const storage = firebaseApp.storage();

        storage.ref('avatar-test2.png').getDownloadURL()
          .then((url) => {
console.log(url);
          })
        
      })
      .catch((error) => {
        // alert(error.message);
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
          Nie masz konta? <a className="switch">Zarejestruj się</a>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
      </div>
    </>
  );
};
