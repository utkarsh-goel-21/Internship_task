import { useState } from "react";
import JoinScreen from "./components/JoinScreen";
import ChatScreen from "./components/ChatScreen";
import "./App.css";

const App = () => {
  const [username, setUsername] = useState(null);

  return (
    <div className="app">
      {username ? (
        <ChatScreen username={username} />
      ) : (
        <>
          <div className="chat chat--preview">
            <aside className="chat__sidebar">
              <div className="chat__brand">
                <span className="chat__brand-icon">💬</span>
                <span className="chat__brand-name">ChatFlow</span>
              </div>
              <div className="users-list">
                <p className="users-list__title">Online (3)</p>
                <ul className="users-list__items">
                  {["Alex", "Jordan", "Taylor"].map((u) => (
                    <li key={u} className="users-list__item">
                      <span className="users-list__dot" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            <div className="chat__main">
              <header className="chat__header">
                <div className="chat__header-info">
                  <h3 className="chat__header-title"># general</h3>
                  <span className="chat__header-sub">3 online</span>
                </div>
              </header>
              <div className="chat__messages">
                <div className="notification">Alex joined the chat</div>
                <div className="bubble bubble--other">
                  <div className="bubble__avatar">A</div>
                  <div className="bubble__body">
                    <span className="bubble__username">Alex</span>
                    <div className="bubble__content">
                      <p className="bubble__text">Hey everyone! 👋</p>
                      <span className="bubble__time">12:00</span>
                    </div>
                  </div>
                </div>
                <div className="bubble bubble--own">
                  <div className="bubble__body">
                    <div className="bubble__content">
                      <p className="bubble__text">Welcome to ChatFlow!</p>
                      <span className="bubble__time">12:01</span>
                    </div>
                  </div>
                </div>
                <div className="bubble bubble--other">
                  <div className="bubble__avatar">J</div>
                  <div className="bubble__body">
                    <span className="bubble__username">Jordan</span>
                    <div className="bubble__content">
                      <p className="bubble__text">This looks great 🔥</p>
                      <span className="bubble__time">12:02</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat__input-area">
                <input
                  className="chat__input"
                  placeholder="Message #general"
                  disabled
                />
                <button className="chat__send-btn" disabled>Send</button>
              </div>
            </div>
          </div>
          <JoinScreen onJoin={setUsername} />
        </>
      )}
    </div>
  );
};

export default App;