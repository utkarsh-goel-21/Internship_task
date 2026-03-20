import { useState, useEffect } from "react";
import socket from "../services/socketService";

const useChat = (username) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Connect to socket
    socket.connect();
    socket.emit("user_join", username);
    setConnected(true);

    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, { ...data, type: "message" }]);
    });

    // Listen for user join notifications
    socket.on("user_joined", (data) => {
      setMessages((prev) => [...prev, { ...data, type: "notification" }]);
    });

    // Listen for user leave notifications
    socket.on("user_left", (data) => {
      setMessages((prev) => [...prev, { ...data, type: "notification" }]);
    });

    // Listen for updated users list
    socket.on("users_list", (usersList) => {
      setUsers(usersList);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      setConnected(false);
    };
  }, [username]);

  const sendMessage = (message) => {
    socket.emit("send_message", { message });
  };

  return { messages, users, connected, sendMessage };
};

export default useChat;