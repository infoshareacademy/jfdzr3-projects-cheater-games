import "./auth.css";
import { useState} from 'react';
import firebaseApp from "../firebaseConfig";

export const Registration = () => {

const [user, setUser] = useState({
    nickname: '',
    email: '',
    password: '',
    error: '',
});

const { nickname, email, password, error } = user;

const handleChange = e => {
    setUser({
        ...user,
        [e.target.name]: e.target.value,
        error: '',

    });
    console.log(e.target.name);

};

// const [nickname, setNickname] = useState('');
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [emailError, setEmailError] = useState('');
// const [passwordError, setPasswordError] = useState('');
// const [hasAccount, sethasAccount] = useState(false);

// const handleSignup = (nickname, email, password) => {
//     firebaseApp.auth().createUserWithEmailAndPassword(email, password).then((token) => {
//         console.log(token);
//         console.log(token.user.nickname);
//         console.log(token.user.uid);
//     });
// }


const handleOnSubmit = (e) => {
    e.preventDefault();
    firebaseApp.auth().createUserWithEmailAndPassword(email, password).then((token) => {
        console.log(token);
        console.log(token.user.nickname);
        console.log(token.user.uid);
        console.log(user);
        console.log(user.nickname);
    });
}


return (
      <>
        <div className="modal">
              <h2>Zarejestruj się</h2>
              <form className="registration__form" id="signUp-form" onSubmit={handleOnSubmit}>
                <label htmlFor="nickname"
                  >Imię postaci:
                  <input
                  value={nickname}
                    type="text"
                    className="form__input"
                    name="nickname"
                    id="nickname"
                    required onChange={handleChange}
                  />
                </label>
                <label htmlFor="signUp-email"
                  >Adres email:
                  <input
                  value={email}
                    type="email"
                    className="form__input"
                    name="email"
                    id="signUp-email"
                    required onChange={handleChange}
                  />
                </label>
                <label htmlFor="signUp-password"
                  >Hasło:
                  <input
                  value={password}
                    type="password"
                    className="form__input"
                    name="password"
                    id="signUp-password"
                    required onChange={handleChange}
                  />
                </label>
                <button type="submit" className="myButton">Utwórz postać!</button>
              </form>
              <div>Masz konto? <a className="switch">Zaloguj się</a></div>
            </div>
      </>
    );
  };