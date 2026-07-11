import { FaShoppingCart, FaUser, FaHeart, FaHome } from 'react-icons/fa';
import { MdOutlineLocalShipping } from 'react-icons/md';
import './LeftSidebar.css';
import { Link } from 'react-router-dom';

function LeftSidebar() {
  return (
    <>
      <aside className="left-sidebar">
        <h2 className='logo-title'>The social hive</h2>

        <div className='react-icons-container'> 
          <Link to="/" className="nav-link">
            <FaHome size={24} /> <span>Home</span>
          </Link>

          <Link to="/cart" className="nav-link">
            <FaShoppingCart size={24} color="#474141" /> <span>Cart</span>
          </Link>

          <Link to="/profile" className="nav-link">
            <FaUser size={24} /> <span>Profile</span>
          </Link>

          <Link to="/favorites" className="nav-link">
            <FaHeart size={24} color="red" /> <span>Favorite</span>
          </Link>

          <Link to="/shipping" className="nav-link">
            <MdOutlineLocalShipping size={28} /> <span>Shipping</span>
          </Link>

          {/* <Link to="/Setting" className="nav-link">
            <FaGear  size={20} /> <span>Setting</span>
          </Link> */}
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn">Log Out</button>
        </div>
      </aside>
    </>
  );
}

export default LeftSidebar;