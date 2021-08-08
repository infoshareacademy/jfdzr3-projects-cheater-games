import "./auth.css";
import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../firebaseConfig";

const createCharacter = (uid, nickname) => {
  return db
    .collection("users")
    .doc(uid)
    .set({
      exp: 0,
      level: 1,
      nextLevel: 100,
      isOnline: true,
      name: nickname,
      role: "player",
      uid,
      stats: {
        str: 1,
        agi: 1,
        tough: 1,
        int: 1,
        perc: 1,
        left: 10,
        speed: 1,
        vit: 1,
      },
      resources: {
        gold: 100,
        material: 50,
        wood: 50,
      },
    });
};

const createPlayerArmory = (uid) => {
  return db.collection("users").doc(uid).collection("armory").add({});
};

export const Registration = () => {
  const [user, setUser] = useState({
    nickname: "",
    email: "",
    password: "",
    error: "",
  });
  const history = useHistory();

  const { nickname, email, password, error } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: "",
    });
    return user;
  };

  const resetFormOnSubmit = (e) => {
    e.target.reset();
  };

  const translatedFirebaseErrors = {
    "auth/weak-password": "Hasło powinno mieć co najmniej 6 znaków.",
    "auth/email-already-in-use": "Adres email jest już używany.",
    "auth/network-request-failed": "Brak połączenia z serwerem.",
  };

  const createUser = (e) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((token) => {
        token.user.updateProfile({
          displayName: user.nickname,
        });
        history.push("/");
        createCharacter(token.user.uid, user.nickname);
        createPlayerArmory(token.user.uid);
        resetFormOnSubmit(e);
      })
      .catch((error) => {
        console.log("error", error);
        setUser({
          ...user,
          error,
        });
      });
  };

  const checkUsernameInDb = (username) => {
    return db.collection("users").where("name", "==", username).get();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    checkUsernameInDb(user.nickname)
      .then((data) => {
        if (!data.empty) {
          setUser({
            ...user,
            error: {
              message:
                "Użytkownik o podanym nicku już istnieje! Wybierz inny nick.",
            },
          });
          return;
        }
        createUser(e);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="modal">
        <h2>Zarejestruj się</h2>
        <form
          className="registration__form"
          id="signUp-form"
          onSubmit={handleOnSubmit}
        >
          <label htmlFor="nickname">
            Imię postaci:
            <input
              value={nickname}
              type="text"
              className="form__input"
              name="nickname"
              id="nickname"
              required
              onChange={handleChange}
            />
          </label>
          <label htmlFor="signUp-email">
            Adres email:
            <input
              value={email}
              type="email"
              className="form__input"
              name="email"
              autoComplete="username email"
              id="signUp-email"
              required
              onChange={handleChange}
            />
          </label>
          <label htmlFor="signUp-password">
            Hasło:
            <input
              value={password}
              type="password"
              className="form__input"
              autoComplete="new-password"
              name="password"
              id="signUp-password"
              required
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="btn btn-green">
            Utwórz postać!
          </button>
        </form>
        <div className="user-action">
          Masz konto? <Link to="/login">Zaloguj się</Link>
        </div>
        <div className="error">
          {error && (
            <p>{translatedFirebaseErrors[error.code] || error.message}</p>
          )}
        </div>
      </div>
    </>
  );
};
