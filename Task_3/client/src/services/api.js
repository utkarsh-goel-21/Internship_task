import axios from "axios";

const API_BASE = "http://localhost:3002/api";

// Get all documents
export const getDocuments = async () => {
  const res = await axios.get(`${API_BASE}/documents`);
  return res.data;
};

// Create a new document
export const createDocument = async (title = "Untitled Document") => {
  const res = await axios.post(`${API_BASE}/documents`, { title });
  return res.data;
};

// Get a single document
export const getDocument = async (id) => {
  const res = await axios.get(`${API_BASE}/documents/${id}`);
  return res.data;
};

// Update document title
export const updateDocumentTitle = async (id, title) => {
  const res = await axios.patch(`${API_BASE}/documents/${id}/title`, { title });
  return res.data;
};

// Delete a document
export const deleteDocument = async (id) => {
  await axios.delete(`${API_BASE}/documents/${id}`);
};