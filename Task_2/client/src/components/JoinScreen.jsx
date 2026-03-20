import { useState } from "react";

// Screen shown before user joins the chat
const JoinScreen = ({ onJoin }) => {
  const [username, setUsername] = useState("");

  const handleJoin = () => {
    if (username.trim()) {
      onJoin(username.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleJoin();
  };

  return (
    <div className="join-screen">
      <div className="join-screen__card">
        <h1 className="join-screen__title">💬 ChatFlow</h1>
        <p className="join-screen__subtitle">Enter your name to join the chat</p>
        <input
          type="text"
          className="join-screen__input"
          placeholder="Your name..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={20}
          autoFocus
        />
        <button
          className="join-screen__btn"
          onClick={handleJoin}
          disabled={!username.trim()}
        >
          Join Chat →
        </button>
      </div>
    </div>
  );
};

export default JoinScreen;