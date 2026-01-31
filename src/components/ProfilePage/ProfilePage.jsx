import React, { useState, useEffect } from 'react';
import { useAuthHook } from '../../context/Contextdata';
import IdeaCard from '../IdeaCard/IdeaCard';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user, setUser} = useAuthHook()
    const [myIdeas, setMyIdeas] = useState([])
    const [githubLink, setGithubLink] = useState('')
    const [isEditingGithub, setIsEditingGithub] = useState(false)

    useEffect(() => {
        if (user) {
            setGithubLink(user.github || '')
            fetch('http://localhost:5000/ideas')
                .then(res => res.json())
                .then(data => {
                    // Filter ideas using user's id
                    const filtered = data.filter(idea => idea.userId === user.id)
                    setMyIdeas(filtered)
                })
                .catch(err => console.error("Error fetching ideas:", err, "🦖"))
        }
    }, [user]);
    // Function to save GitHub link to the database
    const handleSaveGithub = () => {
        fetch(`http://localhost:5000/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ github: githubLink })
        })
        .then(res => {if (!res.ok) throw new Error('Failed to add github URL') 
            return res.json()})
        .then((updatedUserData) => {
            setUser({...user, ...updatedUserData})
            setIsEditingGithub(false)
        })
        .catch(err => console.error("Failed to save GitHub link:", err))
    };

    if (!user) {
        return <div className="profile-container"><p>Please, Just login to view your profile.</p></div>;//what shows on the profile page before logging in
    }

    return (
        <div className="profile-container">
            <header className="profile-header">
                {/* User Avatar */}
                <img src={user.picture} alt="Profile" className="profile-pic" />
                
                <div className="profile-info">
                    <h2>{user.name || 'Stubborn User!'}</h2>
                    <p>{user.email}</p>
                    
                    {/* github input section */}
                    <div className="github-section">
                        {isEditingGithub ? (
                            <div className="github-input-group">
                                <input 
                                    type="text" 
                                    placeholder="Add GitHub URL"
                                    value={githubLink}
                                    onChange={(e) => setGithubLink(e.target.value)}
                                    className="github-input"
                                />
                                <button onClick={handleSaveGithub} className="save-btn">Save</button>
                                {/* Cancel button to exit edit mode without saving */}
                                <button onClick={() => setIsEditingGithub(false)} className="cancel-btn">Cancel</button>
                            </div>
                        ) : (
                            <div className="github-display">
                                {user.github ? (
                                    <a href={user.github} target="_blank" className="github-url">GitHub Profile</a>
                                ) : (
                                    <span className="no-github">No GitHub linked</span>
                                )}
                                <button onClick={() => setIsEditingGithub(true)} className="mini-edit-btn">
                                    {user.github ? 'Edit' : 'Add GitHub'}
                                </button>
                            </div>
                        )}
                    </div>

                    <button className="edit-btn">Edit Profile</button>{/*Incomplete for now*/}
                </div>
            </header>

            {/* ideas section */}
            <section className="my-ideas-section">
                <h3>My Ideas</h3>
                <div className="ideas-grid">
                    {myIdeas.length > 0 ? (
                        myIdeas.map(idea => (
                            <IdeaCard key={idea.id} idea={idea} />
                        ))
                    ) : (
                        <p className="no-ideas">You haven't posted any ideas yet.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;