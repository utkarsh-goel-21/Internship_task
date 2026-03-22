# CollabDocs - Real-Time Collaborative Document Editor

**COMPANY**: CODTECH IT SOLUTIONS

**NAME**: Utkarsh Goel

**INTERN ID**: CTIS5964

**DOMAIN**: Full Stack Development

**DURATION**: 4 Weeks

**MENTOR**: Neela Santosh

---

## Description

CollabDocs is a real-time collaborative document editor built as part of the CodTech Full Stack Development Internship (Task 3 - Real-Time Collaborative Document Editor). Multiple users can create, edit, and collaborate on documents simultaneously with changes syncing instantly across all connected clients — similar to Google Docs.

The project demonstrates a full-stack architecture with a React.js frontend, Node.js/Express backend, Socket.io for real-time synchronization, and PostgreSQL for persistent document storage.

### Key Features

- **Real-Time Collaboration**: Multiple users can edit the same document simultaneously with instant sync via Socket.io
- **Document Management**: Create, open, and delete documents from a clean dashboard
- **Persistent Storage**: All documents saved to PostgreSQL database — content survives page refreshes
- **Google Docs-inspired UI**: Clean white paper editor with a light gray background, toolbar, and document grid
- **Live Indicator**: Green "Live" badge shows real-time connection status
- **Editable Titles**: Document titles update in real-time across all connected clients
- **Responsive Design**: Works across different screen sizes

### Tech Stack

- **Frontend**: React.js (v19), Vite (v8), Tailwind CSS (v4), Shadcn UI
- **Backend**: Node.js, Express, Socket.io
- **Database**: PostgreSQL (v17)
- **Real-Time**: Socket.io WebSockets
- **HTTP Client**: Axios

### Project Structure
```
Task_3/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/ui/     # Shadcn components
│   │   ├── hooks/
│   │   │   └── useDocument.js
│   │   ├── pages/
│   │   │   ├── DocumentList.jsx
│   │   │   └── DocumentEditor.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socketService.js
│   │   └── App.jsx
│   └── index.html
└── server/                    # Node.js backend
    ├── index.js
    └── .env
```

### How to Run Locally

1. Make sure PostgreSQL is running:
```bash
   brew services start postgresql@17
```

2. Create the database and table:
```bash
   createdb collabdocs
   psql collabdocs
```
```sql
   CREATE TABLE documents (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     title VARCHAR(255) NOT NULL DEFAULT 'Untitled Document',
     content TEXT DEFAULT '',
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
```

3. Start the backend:
```bash
   cd server
   npm install
   node index.js
```

4. In a new terminal, start the frontend:
```bash
   cd client
   npm install
   npm run dev
```

5. Open `http://localhost:5173` in your browser
6. Open the same document in two tabs to test real-time collaboration

---

## Output

![CollabDocs Document List](https://github.com/user-attachments/assets/c9365263-6c04-4fca-8de4-425c8a23d62c)

![CollabDocs Editor](https://github.com/user-attachments/assets/25b44937-8bd8-4ee1-9851-f7c7bbf6cfe7)
