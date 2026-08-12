import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Auth
import AuthForm from './Features/AuthForm';
import ForgotPassword from './Features/ForgotPassword';
import ChangePassword from './Features/ChangePassword';
import { AuthProvider, useAuth } from './Features/AuthForm';

// Pages
import ProductCreationForm from './pages/ProductCreationForm';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './Features/Profile';
import ShoppingCart from './pages/cart';
import { Checkout } from './pages/Checkout';
import Favorites from "./pages/Favorites";
import Catalog from './pages/Catalog';
import { CartProvider } from './pages/CartContext';

// Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import RightSidebar from './Components/Sidebars/RightSidebar';
import LeftSidebar from './Components/Sidebars/LeftSidebar';

import ProfileCreationForm from './Features/ProfileCreationForm';
import Storycreationform from './Components/Sidebars/Storycreationform';
import ProtectedRoute from './Components/ProctectedRoute';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isProfilePage = location.pathname === '/profile';
  const showRightSidebar = isHomePage || isProfilePage;

  return (
    <>
      <section className="App">
        <Navbar />

        <div className="app-layout">
          <aside className="profile-column">
            <LeftSidebar />
          </aside>

          <main className="main-content">
            <Routes>
              {/* Authentication Channels */}
              <Route path="/signin" element={<AuthForm />} />
              <Route path="/signup" element={<AuthForm />} />

              {/* Forgot password */}
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/ChangePassword" element={<ChangePassword />} />

              {/* Core Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/favorites" element={<Favorites />} />

              {/* Forms */}
              <Route path="/storycreationform" element={<Storycreationform />} />
              <Route path="/ProfileCreationForm" element={<ProfileCreationForm />} />
              <Route
                path="/product-creation-form"
                element={
                  <ProtectedRoute>
                    <ProductCreationForm />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
          </main>
        </div>

        
        {showRightSidebar && <RightSidebar />}
      </section>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
