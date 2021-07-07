import React from 'react';
import './Message.css';

function Message({username, message}) {
    return (
        <div className="message_view">
            <p>{message.username}: {message.text}</p>
        </div>
    )
};

export default Message;