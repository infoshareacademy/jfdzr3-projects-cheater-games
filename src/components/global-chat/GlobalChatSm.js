import { Message } from "./Message";

export const GlobalChatSm = ({
  messagesEndRef,
  input,
  sendMessage,
  setInput,
  messages,
  user,
}) => {
  return (
    <div className="chat chat--small">
      <div className="chat__messages chat__messages--small">
        {messages.map((message) => {
          return (
            <Message
              key={message.time}
              username={user?.name}
              message={message}
            />
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      <form className="chat__form">
        <input
          className="chat__input"
          placeholder="Wpisz wiadomość...."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        ></input>
        <button
          className="btn btn-small btn-green"
          disabled={!input}
          type="submit"
          onClick={sendMessage}
        >
          Wyślij
        </button>
      </form>
    </div>
  );
};
