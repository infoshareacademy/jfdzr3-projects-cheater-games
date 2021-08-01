import "./ChatBig.css";
import { ImUsers } from "react-icons/im";
import { RiMessageFill } from "react-icons/ri";
import { Message } from "./Message";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

export const ChatBig = ({ input, sendMessage, setInput, messages }) => {
  const [usernames, setUsernames] = useState([]);
  const [chatType, setChatType] = useState("global");
  useEffect(() => {
    const getUsers = async () => {
      const response = await db.collection("users").get();
      const usernameList = [];
      response.forEach((user) => {
        usernameList.push(user.data().name);
      });
      setUsernames(usernameList);
    };
    getUsers();
  }, []);
  return (
    <div className="chat chat--big">
      <div className="chat__navigation">
        <div className="chat__channel">
          <div className="chat__label">
            <RiMessageFill className="chat__icon" />
            <span>Kanał czatu:</span>
          </div>
          <button className="btn btn-small btn-blue">Czat globalny</button>
        </div>
        <div className="chat__usernames">
          <div className="chat__label">
            <ImUsers className="chat__icon" /> Użytkownicy:
            <span></span>
          </div>
          <ul className="usernames-list">
            {usernames.map((username, i) => (
              <li className="usernames-list__item" key={i}>
                {username}
                <div
                  className="user-status user-status--online"
                  title="online"
                ></div>
              </li>
            ))}
            <ul></ul>
          </ul>
        </div>
      </div>
      <div className="chat__view">
        <div className="chat__header">
          Czat {chatType === "global" ? "globalny" : "z użytkownikiem"}
        </div>
        <div className="chat__messages chat__messages--big">
          {messages.map((message) => (
            <Message key={message.time} message={message} />
          ))}
        </div>
        <form className="chat__form">
          <input
            className="chat__input"
            placeholder="Wpisz wiadomość...."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            className="btn btn-small btn-green"
            disabled={!input}
            onClick={sendMessage}
            type="submit"
          >
            Wyślij
          </button>
        </form>
      </div>
    </div>
  );
};