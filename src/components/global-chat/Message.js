import "./Message.css";

export function Message({ message }) {
  return (
    <div className="message__view">
      <p>
        <strong>{message.username}</strong>: {message.text}
      </p>
    </div>
  );
}
