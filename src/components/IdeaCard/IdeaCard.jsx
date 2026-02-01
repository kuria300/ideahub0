import React from 'react';
import './IdeaCard.css';

const IdeaCard = ({ idea }) => {
    const { title, description, githubLink, userEmail, createdAt } = idea;

    return (
        <div className="idea-card">
            <h3 className="idea-title">{title}</h3>

            <p className="idea-description">
                {description}
            </p>

            {githubLink && (
                <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="idea-github"
                >
                    View on GitHub
                </a>
            )}

            <div className="idea-footer">
                <span className="idea-author">
                    {userEmail}
                </span>

                {createdAt && (
                    <span className="idea-date">
                        {new Date(createdAt).toLocaleDateString()}
                    </span>
                )}
            </div>
        </div>
    );
};

export default IdeaCard;
