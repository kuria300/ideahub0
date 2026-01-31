import React, { useState, useEffect } from 'react';
import { useAuthHook } from '../../context/Contextdata';
import IdeaCard from '../IdeaCard/IdeaCard';
import SearchBar from '../SearchBar/SearchBar';
import './IdeaFeedPage.css';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar';


const IdeaFeedPage = () => {
    const { user, Logout, setUser } = useAuthHook();
    const [ideas, setIdeas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const {id}= useParams()

    useEffect(() => {
        fetch('http://localhost:5000/ideas')
            .then(res => res.json())
            .then(data => {
                if (user) {
                    // Sort logic: If userId matches logged-in user, move to top
                    const sortedData = [...data].sort((a, b) => {
                        if (a.userEmail === user.email && b.userEmail !== user.id) return -1;
                        if (a.userEmail !== user.email && b.userEmail === user.id) return 1;
                        return 0;
                    });
                    setIdeas(sortedData);
                } else {
                    setIdeas(data);
                }
            })
            .catch(err => console.error("Error fetching feed:", err));
    }, [user]);

    const handleSession=()=>{
        if(!user){
            toast.error("You need to login first")
            return
        }
        navigate(`/addidea/${user.id}`)
    }

    // Filter based on search bar input
    const filteredIdeas = ideas.filter(idea => {
        if(searchTerm === '') {return true;}
    
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase())
    });

    return (
        <>
        <Navbar id={id}/>
        <div className="feed-container">
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