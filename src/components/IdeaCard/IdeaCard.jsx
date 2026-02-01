import React from 'react';
import './IdeaCard.css';

const IdeaCard = ({ idea }) => {
    return (
        <div className="idea-card">
            <h3 className="idea-title">{idea.title}</h3>

            <p className="idea-description">
                {idea.description}
            </p>

            <div className="idea-footer">
                <span className="idea-author">
                    {idea.userEmail}
                </span>
            </div>
        </div>
    );
};

export default IdeaCard;
