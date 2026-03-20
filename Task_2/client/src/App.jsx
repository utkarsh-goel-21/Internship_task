import { useState } from "react";
import JoinScreen from "./components/JoinScreen";
import ChatScreen from "./components/ChatScreen";
import "./App.css";

const App = () => {
  const [username, setUsername] = useState(null);

  return (
    <div className="app">
      {!username ? (
        <JoinScreen onJoin={setUsername} />
      ) : (
        <ChatScreen username={username} />
      )}
    </div>
  );
};

export default App;