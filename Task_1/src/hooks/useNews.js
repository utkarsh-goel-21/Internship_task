import { useState, useEffect } from "react";
import { fetchTopHeadlines } from "../services/newsService";

const useNews = (category = "general", page = 1) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTopHeadlines(category, page);
        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [category, page]);

  return { articles, loading, error };
};

export default useNews;