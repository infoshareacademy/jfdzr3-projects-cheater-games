import { useState, useEffect } from "react";
import "./global-chat.css";
import Message from "./Message";
import { db } from "../firebaseConfig";
import firebase from "firebase";
import { auth } from "../firebaseConfig";
import { useUser } from "../hooks/useUser";


export function GlobalChat() {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const user = useUser();
    console.log(user);
    
    useEffect(() => {
        db.collection('messages')
        .orderBy('time', 'desc')
        .onSnapshot(messages => {
            setMessages(messages.docs.map(doc => doc.data()))
        })
    }, []);

    if (user === null) {
        return <p>loading</p>
    }
    
    // const { displayName, uid, } = auth.currentUser;

    // console.log(auth.currentUser);

    // console.log(displayName);
        
    const sendMessage = event => {
        event.preventDefault();
        
        db.collection('messages').add({
            text: input,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            username: user?.name,
            uid: user?.uid
        });
        setInput('');
    }

    return (
    <>
        <div className="chat">
            <p className="chat_userinfo">Jesteś zalogowany jako: {user?.name}</p>

            <form>

                <input className="chat_input" placeholder="Wpisz wiadomość...."  value={input} onChange={event => setInput(event.target.value)}></input>
                <button className="chat_button" disabled={!input} type="submit" onClick={sendMessage}>Wyślij</button>

            </form>

            {
            messages.map((message, index) => {
            return (<Message key={message.time} username={user?.name} message={message}/>)
                })
            }
        </div>
    </>    
    )
}; 

// export function GlobalChat() {

//     const [input, setInput] = useState('');
//     const [messages, setMessages] = useState([]);
    
//     useEffect(() => {
//         db.collection('messages')
//         .orderBy('time', 'desc')
//         .onSnapshot(messages => {
//             setMessages(messages.docs.map(doc => doc.data()))
//         })
//     }, []);

//     if (auth.currentUser === null) {
//         return <p>loading</p>
//     }
    
//     const { displayName, uid, } = auth.currentUser;

//     console.log(displayName);
        
//     const sendMessage = event => {
//         event.preventDefault();
        
//         db.collection('messages').add({
//             text: input,
//             time: firebase.firestore.FieldValue.serverTimestamp(),
//             username: displayName,
//             uid: uid,
//         });
//         setInput('');
//     }

//     return (
//     <>
//         <div className="chat">
//             <p className="chat_userinfo">Jesteś zalogowany jako: {displayName}</p>

//             <form>

//                 <input className="chat_input" placeholder="Wpisz wiadomość...."  value={input} onChange={event => setInput(event.target.value)}></input>
//                 <button className="chat_button" disabled={!input} type="submit" onClick={sendMessage}>Wyślij</button>

//             </form>

//             {
//             messages.map((message, index) => {
//             return (<Message key={message.time} username={displayName} message={message}/>)
//                 })
//             }
//         </div>
//     </>    
//     )
// }; 