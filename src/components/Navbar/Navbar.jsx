import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuthHook } from "../../context/Contextdata";



function Navbar() {
  const {user, Logout} = useAuthHook()
  const handleProtectedClick = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Please log in first to access this page.");
      return 
    }
    
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="brand">Origin</span>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/add-idea" onClick={handleProtectedClick}>
            Add Idea
          </Link>
        </li>
      </ul>

      <div className="navbar-right">
        <button className="search-btn">🔍</button>
        {user ? (<li onClick={Logout}>Logout</li>):(<li><Link to='/login'>Login</Link></li>)} 
      </div>
    </nav>
  );
}

export default Navbar;
