import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">IdeaHub</span>
      </div>

      <div className="navbar-center">
        <span className="nav-item">Feed</span>
        <span className="nav-item">Add Idea</span>
        <span className="nav-item">Profile</span>
      </div>

      <div className="navbar-right">
        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
