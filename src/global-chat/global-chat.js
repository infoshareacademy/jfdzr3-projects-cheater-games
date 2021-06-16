import { useState } from "react";



export function GlobalChat() {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    console.log(input);
    console.log(messages);

    const sendMessage = event => {
        event.preventDefault();
        setMessages([...messages, input]);
        setInput('');
    }

    return (
        <div className="chat">

            {/* using form and button type="submit" to allow sending messages by clicking Enter */}
            <form>

            <input value={input} onChange={event => setInput(event.target.value)}></input>
            <button type="submit"onClick={sendMessage}>Wyślij</button>

            </form>

            {
                messages.map(message => {
                    return <p>{message}</p>
                })
            }


        </div>
    )
} 