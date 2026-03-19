// Individual news article card
const NewsCard = ({ article }) => {
  const { title, description, url, image, source, publishedAt } = article;

  // Format the date
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="news-card">
      <img
        src={image || "/placeholder.png"}
        alt={title}
        className="news-card__image"
        onError={(e) => (e.target.src = "/placeholder.png")}
      />
      <div className="news-card__content">
        <span className="news-card__source">{source?.name}</span>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">{description}</p>
        <div className="news-card__footer">
          <span className="news-card__date">{formattedDate}</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="news-card__link"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;