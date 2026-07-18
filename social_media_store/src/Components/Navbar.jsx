import "./Navbar.css"; 
import { Link, useNavigate } from "react-router-dom"; 
// FIX: Imported useAuth hook to read the active user session status
import { useAuth } from "../Features/AuthForm"; 

function Navbar() { 
  const { user, logout } = useAuth(); logout 
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();         
    navigate("/signin"); 
  };

  return ( 
    <nav className="navbar"> 
      <h1 className="navbar-logo-text"> The Social Hive </h1> 
      <div className="navbar-links"> 
        <Link to="/">Home</Link> 
        <Link to="/about">About</Link> 
        <Link to="/contact">Contact</Link> 
        
        
        {!user ? (
          <>
            <Link to="/signin" className="btn-login">Login</Link> 
            <Link to="/signup" className="btn-signup">Signup</Link> 
          </>
        ) : (
          <>
            <span className="navbar-user-greeting">Welcome, {user.name}!</span>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogoutClick} className="btn-logout-nav">
              Logout
            </button>
          </>
        )}
      </div> 
    </nav> 
  ); 
} 

export default Navbar;
