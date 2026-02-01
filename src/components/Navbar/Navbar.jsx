import { useState } from 'react';
import { useAuthHook } from '../../context/Contextdata';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SearchBar from '../SearchBar';
import './Navbar.css';

const Navbar = ({ id, searchTerm, setSearchTerm }) => {
  const { user, Logout } = useAuthHook();
  const navigate = useNavigate();

  const handleSession = () => {
    if (!user) {
      toast.error('Please Login first!');
      return;
    }
    navigate(`/addidea/${id}`);
  };

  const handleProfile = () => {
    if (!user) {
      toast.error('Please Login first!');
      return;
    }
    navigate(`/profile/${id}`);
  };

  return (
    <header className='header-container'>
      <h1 className='nav-heading'>
        <span style={{ color: '#3AB0A6' }}>O</span>rigin
      </h1>

      <nav className='nav-container'>
        <ul>
          <li onClick={handleSession}>Create</li>
          {user ? (
            <li onClick={Logout}>Logout</li>
          ) : (
            <li>
              <Link to='/login'>Login</Link>
            </li>
          )}
        </ul>
      </nav>

      <div className='feed-header'>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div>
        {user?.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            onClick={handleProfile}
            className='profile-img'
          />
        ) : (
          <div className='profile-placeholder' onClick={handleProfile}>
            No Image
          </div>
import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
  const handleProtectedClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert("Please log in first to access this page.");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="brand">Origin</span>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/ideas" onClick={handleProtectedClick}>
            Ideas
          </Link>
        </li>
        <li>
          <Link to="/add-idea" onClick={handleProtectedClick}>
            Add Idea
          </Link>
        </li>
      </ul>

      <div className="navbar-right">
        <button className="search-btn">🔍</button>
        {isLoggedIn ? (
          <span className="profile-placeholder">👤</span>
        ) : (
          <Link className="login-text" to="/login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
