import "./IdeaCard.css";


const IdeaCard = ({ idea, onLike }) => {
  return (
    <div className="idea-card">
      <div className="idea-card-header">
        <h3 className="idea-title">{idea.title}</h3>

        <button
          className={`like-button ${idea.liked ? "liked" : ""}`}
          onClick={() => onLike?.(idea.id)}
          aria-label="Like idea"
        >
          {/* <FaHeart /> */}
          <span>{idea.likes}</span>
        </button>
      </div>

      <p className="idea-description">
        {idea.description}
      </p>

      {idea.tags?.length > 0 && (
        <div className="idea-tags">
          {idea.tags.map((tag, index) => (
            <span key={index} className="idea-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="idea-footer">
        <span className="idea-author">
          By {idea.author}
        </span>
      </div>
    </div>
  );
};

export default IdeaCard;
