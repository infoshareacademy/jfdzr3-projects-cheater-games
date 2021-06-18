import { useState, useEffect } from "react";
import "./global-chat.css";
import Message from "./Message";
import firebaseApp from "../firebaseConfig";
import { db } from "../firebaseConfig";
import firebase from "firebase";


export function GlobalChat() {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');

    //Following all changes in messages database, returns object {username: "", text: "" .....}
    useEffect(() => {
        db.collection('messages')
        .orderBy('time', 'desc')
        .onSnapshot(messages => {
            setMessages(messages.docs.map(doc => doc.data()))
        })
    }, []);

    useEffect(() => {
        setUsername(prompt('Please enter your name'));
        console.log(username);
    }, [] );

    console.log(input);
    console.log(messages);

    const sendMessage = event => {
        event.preventDefault();
        db.collection('messages').add({
            text: input,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            username: username

        });
        setMessages([...messages, {username: username, text: input}]);
        setInput('');
    }

    return (
    <>
        <h2>Welcome {username}</h2>
        <div className="chat">

            {/* using form and button type="submit" to allow sending messages by clicking Enter */}
            <form>

            <input placeholder="Wpisz wiadomość...."  value={input} onChange={event => setInput(event.target.value)}></input>
            <button disabled={!input} type="submit"onClick={sendMessage}>Wyślij</button>

            </form>

            {
                messages.map(message => {
                    return (
                    <Message username={username} message={message}/>
                    )
                })
            }


        </div>
    </>    
    )
} 