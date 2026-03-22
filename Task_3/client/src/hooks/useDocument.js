import { useState, useEffect, useCallback } from "react";
import socket from "../services/socketService";
import { getDocument } from "../services/api";

const useDocument = (documentId) => {
  const [document, setDocument] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [connectedUsers, setConnectedUsers] = useState(1);

  useEffect(() => {
    if (!documentId) return;

    // Connect and join document room
    socket.connect();
    socket.emit("join_document", documentId);

    // Document loaded from server
    socket.on("document_loaded", (doc) => {
      setDocument(doc);
      setContent(doc.content);
      setTitle(doc.title);
      setLoading(false);
    });

    // Receive content updates from other users
    socket.on("content_updated", (newContent) => {
      setContent(newContent);
    });

    // Receive title updates from other users
    socket.on("title_updated", (newTitle) => {
      setTitle(newTitle);
    });

    return () => {
      socket.off("document_loaded");
      socket.off("content_updated");
      socket.off("title_updated");
      socket.disconnect();
    };
  }, [documentId]);

  // Emit content change to other users
  const handleContentChange = useCallback(
    (newContent) => {
      setContent(newContent);
      socket.emit("content_change", { documentId, content: newContent });
    },
    [documentId]
  );

  // Emit title change to other users
  const handleTitleChange = useCallback(
    (newTitle) => {
      setTitle(newTitle);
      socket.emit("title_change", { documentId, title: newTitle });
    },
    [documentId]
  );

  return {
    document,
    content,
    title,
    loading,
    connectedUsers,
    handleContentChange,
    handleTitleChange,
  };
};

export default useDocument;