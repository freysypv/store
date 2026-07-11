import './footer.css'; 

function Footer() { 
  return ( 
    <footer className="site-footer"> 
      <div className="footer-container"> 
        {/* Column 1 */} 
        <div className="footer-column"> 
          <h3>About Us</h3> 
          <p> lorem ipsum dolor sit amet, consectetur adipiscing elit. </p> 
        </div> 

        {/* Column 2 */} 
        <div className="footer-column"> 
          <h3>Quick Links</h3> 
          <ul> 
            <li><a href="/services">Services</a></li> 
            <li><a href="/privacy">Privacy Policy</a></li> 
            <li><a href="/terms">Terms of Service</a></li> 
          </ul> 
        </div> 

        {/* Column 3 */} 
        <div className="footer-column"> 
          <h3>Contact</h3> 
          <address> 
            123 Main Street<br /> 
            Fort Worth, TX<br /> 
            Email: contact@example.com 
          </address> 
        </div> 
      </div> 
 
      <div className="footer-bottom"> 
        <p>&copy; 2026 Your Brand. Built with Semantic HTML.</p> 
      </div> 
    </footer> 
  );
} 

export default Footer;

