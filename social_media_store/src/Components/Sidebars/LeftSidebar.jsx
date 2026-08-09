import { FaShoppingCart, FaUser, FaHeart, FaHome, FaBookOpen } from 'react-icons/fa';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './LeftSidebar.css';
import { useAuth } from '../../Features/AuthForm';


const NAV_ITEMS = [
  { path: '/', label: 'Home', Icon: FaHome, size: 24 },
  { path: '/profile', label: 'Profile', Icon: FaUser, size: 24 },
  { path: '/catalog', label: 'Catalog', Icon: FaBookOpen, size: 24 },
  { path: '/cart', label: 'Cart', Icon: FaShoppingCart, size: 24, color: '#67cce9' },
 { path: '/favorites', label: 'Favorite Poducts', Icon: FaHeart, size: 24, color: 'red' },
];
 
const ADMIN_NAV_ITEM ={ path: '/product-creation-form', label: "Add Product", Icon: PlusCircle, size: 28};

function LeftSidebar() {
  const { user } = useAuth();
  const items = user?.isAdmin ? [...NAV_ITEMS, ADMIN_NAV_ITEM] : NAV_ITEMS; 

  return (
    <aside className="left-sidebar">
      <h2 className="logo-title">The social hive</h2>

      <div className="react-icons-container">
        {items.map(({ path, label, Icon, size, color }) => (
          <Link key={path} to={path} className="nav-link">
            <Icon size={size} color={color} /> <span>{label}</span>
          </Link>
        ))}
      </div>
    
      
    </aside>
  );
}

export default LeftSidebar;