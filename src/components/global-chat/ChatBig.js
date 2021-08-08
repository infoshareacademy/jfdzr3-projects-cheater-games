import "./ChatBig.css";
import firebase from "firebase/app";
import { ImUsers } from "react-icons/im";
import { RiMessageFill } from "react-icons/ri";
import { Message } from "./Message";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";

const compareStrings = (str1, str2) => {
  let HAUID;
  let LAUID;
  if (str1 > str2) {
    HAUID = str1;
    LAUID = str2;
  } else {
    HAUID = str2;
    LAUID = str1;
  }
  return [HAUID, LAUID];
};

const findPrivateChat = (user1, user2) => {
  const [HAUID, LAUID] = compareStrings(user1, user2);
  return db
    .collection("privateMessages")
    .where("HAUID", "==", HAUID)
    .where("LAUID", "==", LAUID)
    .get();
};

const createPrivateChat = async (user1, user2) => {
  const [HAUID, LAUID] = compareStrings(user1, user2);
  try {
    const docRef = await db.collection("privateMessages").add({ HAUID, LAUID });
    db.collection("privateMessages")
      .doc(docRef.id)
      .collection("messages")
      .add({});
    return docRef.id;
  } catch (error) {
    console.error(error);
  }
};

export const ChatBig = ({ input, sendMessage, setInput, messages }) => {
  const user = useUser();
  const [users, setUsers] = useState([]);
  const [chatType, setChatType] = useState("global");
  const [privateMessageUser, setPrivateMessageUser] = useState(null);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [currentUserUID, setCurrentUserUID] = useState(null);

  const handlePrivateChat = (e) => {
    setChatType("private");
    const { name, uid } = users.find(
      (user) => user.name === e.target.textContent
    );
    setPrivateMessageUser({ name, uid });
    findPrivateChat(currentUserUID, uid).then((querySnapshot) => {
      if (querySnapshot.empty) {
        createPrivateChat(currentUserUID, uid).then((chatID) => {
          setPrivateMessageUser((old) => ({ ...old, chatID }));
        });
      } else {
        querySnapshot.forEach((doc) => {
          setPrivateMessageUser((old) => ({ ...old, chatID: doc.id }));
        });
      }
    });
  };

  const handleGlobalChat = () => {
    setChatType("global");
    setPrivateMessageUser(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatType === "global") {
      sendMessage(e);
    } else if (chatType === "private") {
      db.collection("privateMessages")
        .doc(privateMessageUser.chatID)
        .collection("messages")
        .add({
          text: input,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          username: user?.name,
        });
      setInput("");
    }
  };

  useEffect(() => {
    return db
      .collection("privateMessages")
      .doc(privateMessageUser?.chatID)
      .collection("messages")
      .orderBy("time")
      .onSnapshot((messages) => {
        setPrivateMessages(messages.docs.map((doc) => doc.data()));
      });
  }, [privateMessageUser?.chatID]);

  useEffect(() => {
    setCurrentUserUID(user?.uid);
  }, [user?.uid]);

  useEffect(() => {
    db.collection("users").onSnapshot((usersList) => {
      setUsers(
        usersList.docs.map((doc) => ({
          name: doc.data().name,
          isOnline: doc.data().isOnline,
          uid: doc.data().uid,
        }))
      );
    });
  }, []);

  return (
    <div className="chat chat--big">
      <div className="chat__navigation">
        <div className="chat__channel">
          <div className="chat__label">
            <RiMessageFill className="chat__icon" />
            <span>Kanał czatu:</span>
          </div>
          <button className="btn btn-small btn-blue" onClick={handleGlobalChat}>
            Czat globalny
          </button>
        </div>
        <div className="chat__usernames">
          <div className="chat__label">
            <ImUsers className="chat__icon" /> Użytkownicy:
            <span></span>
          </div>
          <ul className="usernames-list">
            {users.map((user, i) => (
              <li
                className="usernames-list__item"
                key={i}
                onClick={handlePrivateChat}
              >
                <div
                  className={`user-status user-status--${
                    user.isOnline ? "online" : "offline"
                  }`}
                  title={user.isOnline ? "online" : "offline"}
                ></div>
                {user.name}
              </li>
            ))}
            <ul></ul>
          </ul>
        </div>
      </div>
      <div className="chat__view">
        <div className="chat__header">
          Czat{" "}
          {chatType === "global"
            ? "globalny"
            : `z użytkownikiem ${privateMessageUser.name}`}
        </div>
        <div className="chat__messages chat__messages--big">
          {chatType === "global"
            ? messages.map((message) => (
                <Message key={message.time} message={message} />
              ))
            : privateMessages.map((privateMessage) => (
                <Message key={privateMessage.time} message={privateMessage} />
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
            onClick={handleSendMessage}
            type="submit"
          >
            Wyślij
          </button>
        </form>
      </div>
    </div>
  );
};
