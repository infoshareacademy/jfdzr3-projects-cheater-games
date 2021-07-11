import React from 'react';
import './Message.css';

function Message({username, message}) {
    return (
        <div className="message_view">
            <p><strong>{message.username}</strong>: {message.text}</p>
        </div>
    )
};

export default Message;