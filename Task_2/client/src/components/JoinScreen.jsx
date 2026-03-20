import { useState } from "react";

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
    <div className="join-overlay">
      <div className="join-modal">
        <div className="join-modal__icon">💬</div>
        <h2 className="join-modal__title">Welcome to ChatFlow</h2>
        <p className="join-modal__subtitle">Enter your name to join the conversation</p>
        <input
          type="text"
          className="join-modal__input"
          placeholder="Your name..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={20}
          autoFocus
        />
        <button
          className="join-modal__btn"
          onClick={handleJoin}
          disabled={!username.trim()}
        >
          Join Chat
        </button>
      </div>
    </div>
  );
};

export default JoinScreen;