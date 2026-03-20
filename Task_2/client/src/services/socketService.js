import { io } from "socket.io-client";

// Connect to the Socket.io server
const SOCKET_URL = "http://localhost:3001";

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export default socket;