import { useState, useEffect } from "react";
import "./global-chat.css";
import Message from "./Message";
import firebaseApp from "../firebaseConfig";
import { db } from "../firebaseConfig";
import firebase from "firebase";
import { auth } from "../firebaseConfig";


export function GlobalChat() {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    // const [username, setUsername] = useState('');

    const user = auth.currentUser;
    console.log(user);

    //Following all changes in messages database, returns object {username: "", text: "" .....}
    useEffect(() => {
        db.collection('messages')
        .orderBy('time', 'desc')
        .onSnapshot(messages => {
            setMessages(messages.docs.map(doc => doc.data()))
        })
    }, []);

    if (auth.currentUser === null) {
        return <p>loading</p>
    }
    
    const { displayName, uid, } = auth.currentUser;
        
    console.log(input);
    console.log(messages);
    
    const sendMessage = event => {
        event.preventDefault();
        
        db.collection('messages').add({
            text: input,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            username: displayName,
            uid: uid,
            // photoURL: photoURL

        });
        setMessages([...messages, {username: displayName, text: input}]);
        setInput('');
    }

    return (
    <>
        <div className="chat">
        <h2>Jesteś zalogowany jako: {displayName}</h2>

            {/* using form and button type="submit" to allow sending messages by clicking Enter */}
            <form>

            <input placeholder="Wpisz wiadomość...."  value={input} onChange={event => setInput(event.target.value)}></input>
            <button disabled={!input} type="submit"onClick={sendMessage}>Wyślij</button>

            </form>

            {
                messages.map(message => {
                    return (
                    <Message username={displayName} message={message}/>
                    )
                })
            }


        </div>
    </>    
    )
} 