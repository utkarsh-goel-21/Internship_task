import axios from "axios";

const API_BASE = "http://localhost:3003/api";

// Get stats for the last N days
export const getStats = async (days = 7) => {
  const res = await axios.get(`${API_BASE}/stats?days=${days}`);
  return res.data;
};

// Get weekly productivity report
export const getReport = async () => {
  const res = await axios.get(`${API_BASE}/report`);
  return res.data;
};