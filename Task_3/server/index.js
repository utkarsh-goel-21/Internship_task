const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// ── REST API Routes ──

// Get all documents
app.get("/api/documents", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM documents ORDER BY updated_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single document
app.get("/api/documents/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM documents WHERE id = $1",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create document
app.post("/api/documents", async (req, res) => {
  try {
    const { title } = req.body;
    const result = await pool.query(
      "INSERT INTO documents (title) VALUES ($1) RETURNING *",
      [title || "Untitled Document"]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update document title
app.patch("/api/documents/:id/title", async (req, res) => {
  try {
    const { title } = req.body;
    const result = await pool.query(
      "UPDATE documents SET title = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [title, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete document
app.delete("/api/documents/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM documents WHERE id = $1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Socket.io Real-time Collaboration ──
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a document room
  socket.on("join_document", async (documentId) => {
    socket.join(documentId);
    console.log(`User ${socket.id} joined document ${documentId}`);

    // Send current document content to the user
    try {
      const result = await pool.query(
        "SELECT * FROM documents WHERE id = $1",
        [documentId]
      );
      if (result.rows.length > 0) {
        socket.emit("document_loaded", result.rows[0]);
      }
    } catch (err) {
      console.error(err);
    }
  });

  // Handle content changes
  socket.on("content_change", async ({ documentId, content }) => {
    // Broadcast to all other users in the room
    socket.to(documentId).emit("content_updated", content);

    // Save to database
    try {
      await pool.query(
        "UPDATE documents SET content = $1, updated_at = NOW() WHERE id = $2",
        [content, documentId]
      );
    } catch (err) {
      console.error(err);
    }
  });

  // Handle title changes
  socket.on("title_change", async ({ documentId, title }) => {
    socket.to(documentId).emit("title_updated", title);
    try {
      await pool.query(
        "UPDATE documents SET title = $1, updated_at = NOW() WHERE id = $2",
        [title, documentId]
      );
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});