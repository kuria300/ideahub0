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
    </nav>
  );
}

export default Navbar;
