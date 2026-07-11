import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

// Pages
import Home from './pages/Home'; 
import About from './pages/About'; 
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Cart from './pages/cart'; 

// Components
import Navbar from './Components/Navbar'; 
import Footer from './Components/Footer'; 
import RightSidebar from './Components/Sidebars/RightSidebar'; 
import LeftSidebar from './Components/Sidebars/LeftSidebar'; 

export default function App() { 
  return ( 
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
              <Route path="/" element={<Home />} /> 
              <Route path="/about" element={<About />} /> 
              <Route path="/contact" element={<Contact />} /> 
              <Route path="/profile" element={<Profile />} />
              <Route path="/Cart" element={<Cart />} />
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
  ); 
}
     



