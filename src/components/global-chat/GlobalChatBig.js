import "./GlobalChatBig.css";
import { ImUsers } from "react-icons/im";
import { RiMessageFill } from "react-icons/ri";

export const GlobalChatBig = () => {
  return (
    <div className="chat chat--big">
      <div className="chat__navigation">
        <div className="chat__channel">
          <div className="chat__label">
            <span>
              <RiMessageFill className="chat__icon" />
              Kanał czatu:
            </span>
          </div>
          <button className="btn btn-small btn-blue">Czat globalny</button>
        </div>
        <div className="chat__usernames">
          <div className="chat__label">
            <span>
              <ImUsers className="chat__icon" /> Użytkownicy:
            </span>
          </div>
          <ul className="usernames-list">
            {/* <li className="usernames-list__item">MONSTER
                <div className="user-status user-status--online" title="online">
                </div>
              </li> */}
            <ul></ul>
          </ul>
        </div>
      </div>
      <div className="chat__view">
        <div className="chat__header">Czat z użytkownikiem MONSTER</div>
        <div className="chat__messages chat__messages--big"></div>
        <form className="chat__form">
          <input
            className="chat__input"
            placeholder="Wpisz wiadomość...."
            value=""
          />
          <button className="btn btn-small btn-green" disabled="" type="submit">
            Wyślij
          </button>
        </form>
      </div>
    </div>
  );
};
