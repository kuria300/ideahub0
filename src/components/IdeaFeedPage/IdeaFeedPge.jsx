import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { useAuthHook } from '../../context/Contextdata';
import SearchBar from '../SearchBar/SearchBar';
import './IdeaFeedPage.css';

const IdeaFeedPage = () => {
    const { user } = useAuthHook();
    const [ideas, setIdeas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/ideas')
            .then(res => res.json())
            .then(data => {
                if (user) {
                    // Sort logic: If userEmail matches logged-in user, move to top
                    const sortedData = [...data].sort((a, b) => {
                        if (a.userEmail === user.email && b.userEmail !== user.email) return -1;
                        if (a.userEmail !== user.email && b.userEmail === user.email) return 1;
                        return 0;
                    });
                    setIdeas(sortedData);
                } else {
                    setIdeas(data);
                }
            })
            .catch(err => console.error("Error fetching feed:", err));
    }, [user]);

    // Filter based on search bar input
    const filteredIdeas = ideas.filter(idea => 
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
        <Navbar /> 
        <div className="feed-container">
            <div className="feed-header">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            <div className="ideas-list">
                {filteredIdeas.length > 0 ? 
                (filteredIdeas.map(idea => (<IdeaCard key={idea.id} idea={idea} />))):
                (<p className="no-results">No ideas found matching your search.</p>)
                }
            </div>
        </div>
        </>
    );
};

export default IdeaFeedPage;