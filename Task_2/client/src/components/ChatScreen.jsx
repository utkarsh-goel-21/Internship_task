import { useState, useEffect, useRef } from "react";
import useChat from "../hooks/useChat";
import MessageBubble from "./MessageBubble";
import UsersList from "./UsersList";

const ChatScreen = ({ username }) => {
  const [input, setInput] = useState("");
  const { messages, users, sendMessage } = useChat(username);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat">
      <aside className="chat__sidebar">
        <div className="chat__brand">
          <span className="chat__brand-icon">💬</span>
          <span className="chat__brand-name">ChatFlow</span>
        </div>
        <UsersList users={users} />
      </aside>

      <div className="chat__main">
        <header className="chat__header">
          <div className="chat__header-info">
            <h3 className="chat__header-title"># general</h3>
            <span className="chat__header-sub">{users.length} online</span>
          </div>
          <div className="chat__header-user">
            <div className="chat__avatar">
              {username.charAt(0).toUpperCase()}
            </div>
            <span className="chat__username-label">{username}</span>
          </div>
        </header>

        <div className="chat__messages">
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg}
              currentUser={username}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="chat__input-area">
          <input
            type="text"
            className="chat__input"
            placeholder={`Message #general`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={500}
          />
          <button
            className="chat__send-btn"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;