import "./auth.css"

export const Login = () => {

    // const [nickname, setNickname] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [emailError, setEmailError] = useState('');
    // const [passwordError, setPasswordError] = useState('');
    // const [hasAccount, sethasAccount] = useState(false);
       
    const handleLogin = () => {

    }

    return (
      <>
                  <div class="modal active">

        <h2>Zaloguj się</h2>
        <form
          className="registration__form login__form"
          id="logIn-form"
        >
          <label for="logIn-email">
            Adres email:
            <input
              type="email"
              className="form__input"
              name="email"
              id="logIn-email"
              required
            />
          </label>
          <label for="logIn-password">
            Hasło:
            <input
              type="password"
              className="form__input"
              name="password"
              id="logIn-password"
              required
            />
          </label>
          <button type="submit" className="myButton">
            Wejdź do gry!
          </button>
        </form>
     
        <div>Nie masz konta? <a className="switch">Zarejestruj się</a></div>
        </div>
      </>
    );
  };
  