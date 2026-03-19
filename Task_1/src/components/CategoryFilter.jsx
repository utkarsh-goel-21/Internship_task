// Category filter buttons for news topics
const CATEGORIES = [
  "general",
  "business",
  "technology",
  "sports",
  "health",
  "science",
  "entertainment",
];

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          className={`category-filter__btn ${
            activeCategory === category ? "category-filter__btn--active" : ""
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;