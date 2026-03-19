import { useState } from "react";
import useNews from "./hooks/useNews";
import NewsCard from "./components/NewsCard";
import CategoryFilter from "./components/CategoryFilter";
import "./App.css";

const App = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [page, setPage] = useState(1);
  const { articles, loading, error } = useNews(activeCategory, page);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setPage(1);
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">NewsFlow</h1>
        <p className="app__subtitle">Stay updated with the latest headlines</p>
      </header>

      <main className="app__main">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {loading && <p className="app__status">Loading news...</p>}
        {error && <p className="app__status app__status--error">{error}</p>}

        {!loading && !error && (
          <>
            <div className="news-grid">
              {articles.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
            </div>

            <div className="pagination">
              <button
                className="pagination__btn"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ← Previous
              </button>
              <span className="pagination__page">Page {page}</span>
              <button
                className="pagination__btn"
                onClick={() => setPage((p) => p + 1)}
              >
                Next →
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;