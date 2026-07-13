import "./Navbar.css"; 
import { Link } from "react-router-dom"; 

function Navbar() { 
  
  return ( 
    <nav className="navbar"> 
     
      <h1 className="navbar-logo-text"> The Social Hive </h1> 
     
      <div className="navbar-links"> 
        <Link to="/">Home</Link> 
        <Link to="/about">About</Link> 
        <Link to="/contact">Contact</Link>
        <Link to="/AuthForm" className="btn-signup">Login/Signup</Link>
      </div>
    
    </nav> 
  ); 
} 

export default Navbar;

