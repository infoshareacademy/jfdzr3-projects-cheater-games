import firebase from "firebase/app";
import { db } from "../../firebaseConfig";
import { useState, useEffect, useRef } from "react";
import { useUser } from "../../hooks/useUser";
import { ChatSm } from "./ChatSm";
import { ChatBig } from "./ChatBig";

export function Chat({ size }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useUser();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    db.collection("messages")
      .orderBy("time")
      .onSnapshot((messages) => {
        setMessages(messages.docs.map((doc) => doc.data()));
      });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, user]);

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
  if (size === "sm") {
    return (
      <ChatSm
        messagesEndRef={messagesEndRef}
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        messages={messages}
      />
    );
  } else {
    return (
      <ChatBig
        messagesEndRef={messagesEndRef}
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        messages={messages}
      />
    );
  }
}
