import React, { useState, createContext, useContext } from 'react'; 
import './AuthForm.css'; 
import { useNavigate } from 'react-router-dom'; 


// 1. AUTH CONTEXT & PROVIDER
 
const AuthContext = createContext(null); 

export function AuthProvider({ children }) { 
  const [user, setUser] = useState(() => { 
    // Hydrate state directly out of localStorage on initial app load 
    const savedUser = localStorage.getItem("logged_in_user"); 
    return savedUser ? JSON.parse(savedUser) : null; 
  }); 

  const logout = () => { 
    localStorage.removeItem("auth_token"); 
    localStorage.removeItem("logged_in_user"); 
    localStorage.removeItem("currentUser"); 
    setUser(null); 
  }; 

  return ( 
    <AuthContext.Provider value={{ user, setUser, logout }}> 
      {children} 
    </AuthContext.Provider> 
  ); 
} 

// Custom hook for clean usage down the file tree 
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined && context === null) {
    throw new Error("useAuth must be utilized within an AuthProvider layout shell");
  }
  return context;
}; 


// 2. MAIN AUTH FORM COMPONENT 
 
const AuthForm = () => { 
  const navigate = useNavigate(); 
  const { setUser } = useAuth(); 

  // State to toggle between 'login' and 'signup' views 
  const [isLoginView, setIsLoginView] = useState(true); 

  // State variables for form inputs 
  const [formData, setFormData] = useState({ name: '', email: '', password: '' }); 

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  }; 

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    
    if (isLoginView) { 
      console.log('Logging in with:', { email: formData.email, password: formData.password }); 

      // 1. Retrieve the registered users array 
      const existingUsers = JSON.parse(localStorage.getItem('registered_users')) || []; 

      // 2. Search for a matching email and password combination 
      const validUser = existingUsers.find( 
        user => user.email === formData.email && user.password === formData.password 
      ); 

      if (validUser) { 
        // 3. Store active session profiles 
        localStorage.setItem('currentUser', JSON.stringify(validUser)); 
        localStorage.setItem('logged_in_user', JSON.stringify(validUser)); 
        
        // Update global auth state context 
        setUser(validUser); 

        // 4. Navigate to the home route 
        navigate('/'); 
      } else { 
        alert('Invalid credentials, please try again!'); 
      } 

    } else { 
      console.log('Signing up with:', formData); 

      // 1. Get existing users array or create a new empty one 
      const existingUsers = JSON.parse(localStorage.getItem('registered_users')) || []; 

      // 2. Check if the email is already registered 
      const userExists = existingUsers.some(user => user.email === formData.email); 
      if (userExists) { 
        alert('An account with this email already exists!'); 
        return; 
      } 

      // 3. Add the new user object to the array 
      const newUser = { name: formData.name, email: formData.email, password: formData.password }; 
      existingUsers.push(newUser); 

      // 4. Save the updated array back to local storage 
      localStorage.setItem('registered_users', JSON.stringify(existingUsers)); 

      // 5. Inform user and switch view to login automatically 
      alert('Sign up successful! Please log in.'); 
      setIsLoginView(true); 

      // 6. Clear the form inputs 
      setFormData({ name: '', email: '', password: '' }); 
    } 
  }; 

  return ( 
    <div className="auth-container"> 
      <div className="auth-card"> 
        <h2>{isLoginView ? 'Login' : 'Sign Up'}</h2> 
        <form onSubmit={handleSubmit}> 
          {!isLoginView && ( 
            <div className="auth-input"> 
              <label htmlFor="name">Username</label> 
              <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required /> 
            </div> 
          )} 
          <div className="auth-input"> 
            <label htmlFor="email">Email</label> 
            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required /> 
          </div> 
          <div className="auth-input"> 
            <label htmlFor="password">Password</label> 
            <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required /> 
          </div> 
          <button type="submit" className="auth-submit-btn"> 
            {isLoginView ? 'Login' : 'Sign Up'} 
          </button> 
        </form> 
        <p className="auth-toggle-text"> 
          {isLoginView ? "Don't have an account? " : "Already have an account? "} 
          <span 
            className="auth-toggle-link" 
            onClick={() => setIsLoginView(!isLoginView)} 
            role="button" 
            tabIndex={0} 
            onKeyDown={(e) => { 
              if (e.key === 'Enter' || e.key === ' ') { 
                setIsLoginView(!isLoginView); 
              } 
            }} 
          > 
            {isLoginView ? 'Sign Up here' : 'Login here'} 
          </span> 
        </p> 
      </div> 
    </div> 
  ); 
}; 

export default AuthForm;
