import React, { useState, useEffect } from 'react';
import { useAuthHook } from '../../context/Contextdata';
import IdeaCard from '../IdeaCard/IdeaCard';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user } = useAuthHook();
    const [myIdeas, setMyIdeas] = useState([]);

    useEffect(() => {
        if (user) {
            fetch('http://localhost:5000/ideas')
                .then(res => res.json())
                .then(data => {
                    // Filter ideas when the creator's email matches the logged-in user
                    const filtered = data.filter(idea => idea.userEmail === user.email);
                    setMyIdeas(filtered);
                })
                .catch(err => console.error("Error fetching ideas:", err, "🦖"));
        }
    }, [user]);

    if (!user) {
        return <div className="profile-container"><p>Please login to view your profile.</p></div>;//what shows on the profile page before logging in
    }

    return (
        <div className="profile-container">
            <header className="profile-header">
                <img src={user.picture} alt="Profile" className="profile-pic" />
                <div className="profile-info">
                    <h2>{user.name || 'Stubborn User!'}</h2>
                    <p>{user.email}</p>
                    <button className="edit-btn">Edit Profile</button>
                </div>
            </header>

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