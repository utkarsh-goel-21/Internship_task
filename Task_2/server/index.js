const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Store connected users
const users = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining
  socket.on("user_join", (username) => {
    users[socket.id] = username;
    // Notify all users someone joined
    io.emit("user_joined", {
      username,
      message: `${username} joined the chat`,
      timestamp: new Date().toISOString(),
    });
    // Send updated user list to everyone
    io.emit("users_list", Object.values(users));
  });

  // Handle incoming messages
  socket.on("send_message", (data) => {
    io.emit("receive_message", {
      username: users[socket.id],
      message: data.message,
      timestamp: new Date().toISOString(),
    });
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    const username = users[socket.id];
    delete users[socket.id];
    io.emit("user_left", {
      username,
      message: `${username} left the chat`,
      timestamp: new Date().toISOString(),
    });
    io.emit("users_list", Object.values(users));
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});