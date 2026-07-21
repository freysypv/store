import { FaShoppingCart, FaUser, FaHeart, FaHome, FaBookOpen } from 'react-icons/fa';
import { MdOutlineLocalShipping } from 'react-icons/md';
import './LeftSidebar.css';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Home', Icon: FaHome, size: 24 },
  { path: '/profile', label: 'Profile', Icon: FaUser, size: 24 },
  { path: '/Catalog', label: 'Catalog', Icon: FaBookOpen, size: 24 },
  { path: '/cart', label: 'Cart', Icon: FaShoppingCart, size: 24, color: '#474141' },
  { path: '/favorites', label: 'Favorite', Icon: FaHeart, size: 24, color: 'red' },
  { path: '/product-creation-form', label: 'Add Product', Icon: PlusCircle, size: 28 },
  // { path: '//product-creation-form', label: '', Icon: , size: 28 },
];

function LeftSidebar() {
  return (
    <aside className="left-sidebar">
      <h2 className="logo-title">The social hive</h2>

      <div className="react-icons-container">
        {NAV_ITEMS.map(({ path, label, Icon, size, color }) => (
          <Link key={path} to={path} className="nav-link">
            <Icon size={size} color={color} /> <span>{label}</span>
          </Link>
        ))}
      </div>

        
    </aside>
  );
}

export default LeftSidebar;
