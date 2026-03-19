// Vercel serverless function - proxies GNews API to avoid CORS
export default async function handler(req, res) {
  const { category = "general", page = 1 } = req.query;
  const API_KEY = process.env.VITE_GNEWS_API_KEY;

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=${category}&page=${page}&max=12&lang=en&apikey=${API_KEY}`
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}