// Base URL for the GNews API
const BASE_URL = "https://gnews.io/api/v4";
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

// Fetch top headlines by category
export const fetchTopHeadlines = async (category = "general", page = 1) => {
  const response = await fetch(
    `${BASE_URL}/top-headlines?category=${category}&page=${page}&max=12&lang=en&apikey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();
  return data;
};