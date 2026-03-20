import { useState, useEffect, useRef } from "react";
import useChat from "../hooks/useChat";
import MessageBubble from "./MessageBubble";
import UsersList from "./UsersList";

// Main chat screen component
const ChatScreen = ({ username }) => {
  const [input, setInput] = useState("");
  const { messages, users, sendMessage } = useChat(username);
  const bottomRef = useRef(null);

  // Auto scroll to latest message
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
        <h2 className="chat__logo">💬 ChatFlow</h2>
        <UsersList users={users} />
      </aside>

      <div className="chat__main">
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
            placeholder="Type a message..."
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