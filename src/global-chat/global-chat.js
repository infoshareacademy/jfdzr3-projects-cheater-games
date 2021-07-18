import { useState, useEffect, useRef } from "react";
import "./global-chat.css";
import Message from "./Message";
import { db } from "../firebaseConfig";
import firebase from "firebase/app";
import { useUser } from "../hooks/useUser";

export function GlobalChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useUser();

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'end' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    db.collection("messages")
      .orderBy("time")
      .onSnapshot((messages) => {
        setMessages(messages.docs.map((doc) => doc.data()));
      });
  }, []);

 

  if (user === null) {
    return <p>loading</p>;
  }

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      text: input,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      username: user?.name,
      uid: user?.uid,
    });
    setInput("");
  };



  return (
    <>
      <div className="chat">
      
        <div className="chat_messages">
          {messages.map((message, index) => {
            return (
              <Message
                key={message.time}
                username={user?.name}
                message={message}
              />
            );
          })}
          <div ref={messagesEndRef}></div>
        </div>

        <form className="chat-form">
          <input
            className="chat_input"
            placeholder="Wpisz wiadomość...."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          ></input>
          <button
            className="btn btn-small btn-green"
            disabled={!input}
            type="submit"
            onClick={sendMessage}
          >
            Wyślij
          </button>
        </form>

      </div>
    </>
  );
}
