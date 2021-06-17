import React from 'react';
import './Message.css';

function Message({username, message}) {
    return (
        <div className="message_view">
            <h2>{message.username}: {message.text}</h2>

        </div>

    )
}

export default Message;