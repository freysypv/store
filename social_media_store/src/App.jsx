import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

// Auth Wrapper Context
import { AuthProvider } from './Features/AuthForm'; 

// Pages
import Home from './pages/Home'; 
import About from './pages/About'; 
import Contact from './pages/Contact'; 
import Profile from './Features/Profile'; 
import Cart from './pages/cart'; 
import Catalog from './pages/Catalog'; 

import ProfileCreationForm from './Features/ProfileCreationForm'; 

// Components Layout Shells
import Navbar from './Components/Navbar'; 
import Footer from './Components/Footer'; 
import RightSidebar from './Components/Sidebars/RightSidebar'; 
import LeftSidebar from './Components/Sidebars/LeftSidebar'; 
import AuthForm from './Features/AuthForm'; 

export default function App() { 
  return ( 
    <AuthProvider> 
      <Router> 
        <section className="App"> 
          <Navbar /> 
          <div className="app-layout"> 
            
            {/* Left Side Navigation */} 
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
                <Route path="/cart" element={<Cart />} /> 
                <Route path="/catalog" element={<Catalog />} /> 
                <Route path="/ProfileCreationForm" element={<ProfileCreationForm />} /> 
                <Route path="*" element={<h1>404 - Page Not Found</h1>} /> 
              </Routes> 
            </main> 
            
            {/* Right Side Info Panels */} 
            <aside className="tending-column"> 
              <RightSidebar /> 
            </aside> 
            
          </div> 
        </section> 
        <Footer /> 
      </Router> 
    </AuthProvider> 
  ); 
}
