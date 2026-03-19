// Base URL for the News API
const BASE_URL = "https://newsapi.org/v2";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Fetch top headlines by category
export const fetchTopHeadlines = async (category = "general", page = 1) => {
  const response = await fetch(
    `${BASE_URL}/top-headlines?category=${category}&page=${page}&pageSize=12&language=en&apiKey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();
  return data;
};