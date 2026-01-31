import { Link } from 'react-router-dom';
import './Navbar.css';

const isLoggedIn = false;

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="brand">Origin</span>
      </div>

      <ul className="navbar-links">
        <li className="active"><Link to="/ideas">Ideas</Link></li>
        <li><Link to="/add-idea">Add Idea</Link></li>
      </ul>

      <div className="navbar-right">
        <button className="search-btn">🔍</button>
        {isLoggedIn ? (
          <span className="profile-placeholder">👤</span>
        ) : (
          <Link className="login-text" to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
