import React from 'react';
import './Message.css';

function Message(props) {
    return (
        <div className="message_view">
            <h2>{props.username}: {props.text}</h2>

        </div>

    )
}

export default Message;