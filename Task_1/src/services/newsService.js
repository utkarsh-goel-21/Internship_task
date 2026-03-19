// Uses proxy in production, direct call in local dev
const isDev = import.meta.env.DEV;
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const BASE_URL = isDev
  ? "https://gnews.io/api/v4"
  : "";

export const fetchTopHeadlines = async (category = "general", page = 1) => {
  const url = isDev
    ? `${BASE_URL}/top-headlines?category=${category}&page=${page}&max=12&lang=en&apikey=${API_KEY}`
    : `/api/news?category=${category}&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();
  return data;
};