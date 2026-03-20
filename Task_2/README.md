# ChatFlow - Real-Time Chat Application

**COMPANY**: CODTECH IT SOLUTIONS

**NAME**: Utkarsh Goel

**INTERN ID**: CTIS5964

**DOMAIN**: Full Stack Development

**DURATION**: 4 Weeks

**MENTOR**: Neela Santosh

---

## Description

ChatFlow is a real-time chat application built as part of the CodTech Full Stack Development Internship (Task 2 - Chat Application). The application enables multiple users to communicate instantly using WebSocket technology via Socket.io, with a Node.js/Express backend and a React.js frontend.

The project demonstrates full-stack development with real-time bidirectional communication. The backend manages socket connections, tracks online users, and broadcasts messages and events to all connected clients. The frontend provides a modern dark UI with a modal join screen, live online user list, message bubbles with avatars, and auto-scrolling.

### Key Features

- **Real-Time Messaging**: Instant message delivery using Socket.io WebSockets
- **Online Users List**: Live sidebar showing all currently connected users
- **Join/Leave Notifications**: Amber notifications when users join or leave
- **Message Bubbles**: Own messages in blue on the right, others in gray on the left with initials avatar
- **Modal Join Screen**: Blurred chat preview with centered modal to enter username
- **Auto Scroll**: Chat automatically scrolls to the latest message
- **Responsive Design**: Sidebar hides on mobile for clean experience

### Tech Stack

- **Frontend**: React.js (v19), Vite (v8)
- **Backend**: Node.js, Express, Socket.io
- **Styling**: Plain CSS with CSS variables and BEM naming
- **Real-Time**: Socket.io (WebSocket with fallbacks)

### Project Structure
```
Task_2/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatScreen.jsx
│   │   │   ├── JoinScreen.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   └── UsersList.jsx
│   │   ├── hooks/
│   │   │   └── useChat.js
│   │   ├── services/
│   │   │   └── socketService.js
│   │   ├── App.jsx
│   │   └── App.css
│   └── index.html
└── server/               # Node.js backend
    └── index.js
```

### How to Run Locally

1. Clone the repository and navigate to Task_2

2. Start the backend server:
```bash
   cd server
   npm install
   node index.js
```

3. In a new terminal, start the frontend:
```bash
   cd client
   npm install
   npm run dev
```

4. Open `http://localhost:5173` in your browser
5. Open a second tab to test real-time messaging between two users

---

## Output

![ChatFlow App Screenshot](https://github.com/user-attachments/assets/7deebf38-3938-4c99-89e2-78b5046243bb)
