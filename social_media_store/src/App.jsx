import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Auth
import { AuthProvider } from './Features/AuthForm';
// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './Features/Profile';
import ShoppingCart from './pages/cart';
import { Checkout } from "./pages/Checkout";
import Catalog from './pages/Catalog';
import { CartProvider } from './pages/CartContext'; 

import DataService from "./services/DataService";

// Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import RightSidebar from './Components/Sidebars/RightSidebar';
import LeftSidebar from './Components/Sidebars/LeftSidebar';
import StoriesCarousel from './Components/Sidebars/Stories';

import ProductCreationForm from './pages/ProductCreationForm';
import AuthForm from './Features/AuthForm';
import ProfileCreationForm from './Features/ProfileCreationForm';
import Storycreationform from './Components/Sidebars/Storycreationform';

const service = new DataService();

export default function App() {
  const handleProductCreate = (product) => service.addProduct(product);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
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
                  <Route path="/login" element={<AuthForm />} />

                  {/* Standard Core Site Pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/cart" element={<ShoppingCart />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/checkout" element={<Checkout />} />

                  {/* forms */}
                  <Route path="/storycreationform" element={<Storycreationform />} />
                  <Route path="/ProfileCreationForm" element={<ProfileCreationForm />} />
                  <Route path="/product-creation-form" element={<ProductCreationForm onProductCreate={handleProductCreate} />} />

                  <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                </Routes>
              </main>

              <aside className="tending-column">
                <RightSidebar />
              </aside>
            </div>
          </section>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}