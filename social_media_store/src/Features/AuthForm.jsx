import React, { useState, createContext, useContext } from 'react';
import './AuthForm.css';
import { useNavigate, Link } from 'react-router-dom';

// 1. AUTH CONTEXT & PROVIDER

const AuthContext = createContext(null);

const ADMIN_EMAILS = ['freysypv@gmail.com'];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("logged_in_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("logged_in_user");
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  // Change password for the currently logged-in user
  const changePassword = (currentPassword, newPassword) => {
    if (!user) return { success: false, message: "Not logged in." };

    const existingUsers = JSON.parse(localStorage.getItem('registered_users')) || [];
    const index = existingUsers.findIndex(u => u.email === user.email);

    if (index === -1) return { success: false, message: "User not found." };
    if (existingUsers[index].password !== currentPassword) {
      return { success: false, message: "Current password is incorrect." };
    }

    existingUsers[index].password = newPassword;
    localStorage.setItem('registered_users', JSON.stringify(existingUsers));

    const updatedUser = { ...user, password: newPassword };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    localStorage.setItem('logged_in_user', JSON.stringify(updatedUser));
    setUser(updatedUser);

    return { success: true, message: "Password updated." };
  };

  // Reset password via email (no current password required)
  const resetPassword = (email, newPassword) => {
    const existingUsers = JSON.parse(localStorage.getItem('registered_users')) || [];
    const index = existingUsers.findIndex(u => u.email === email);

    if (index === -1) {
      return { success: false, message: "No account found with that email." };
    }

    existingUsers[index].password = newPassword;
    localStorage.setItem('registered_users', JSON.stringify(existingUsers));

    return { success: true, message: "Password reset. Please log in." };
  };


  return (
    <AuthContext.Provider value={{ user, setUser, logout, changePassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined || context === null) {
    throw new Error("useAuth must be utilized within an AuthProvider layout shell");
  }
  return context;
};


const AuthForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoginView) {
      const existingUsers = JSON.parse(localStorage.getItem('registered_users')) || [];

      const validUser = existingUsers.find(
        user => user.email === formData.email && user.password === formData.password
      );

      if (validUser) {
        const userWithRole = {
          ...validUser,
          isAdmin: ADMIN_EMAILS.includes(validUser.email),
        };
        localStorage.setItem('currentUser', JSON.stringify(userWithRole));
        localStorage.setItem('logged_in_user', JSON.stringify(userWithRole));
        setUser(userWithRole);
        navigate('/');
      } else {
        alert('Invalid credentials, please try again!');
      }

    } else {
      const existingUsers = JSON.parse(localStorage.getItem('registered_users')) || [];

      const userExists = existingUsers.some(user => user.email === formData.email);
      if (userExists) {
        alert('An account with this email already exists!');
        return;
      }

      const newUser = { name: formData.name, email: formData.email, password: formData.password };
      existingUsers.push(newUser);

      localStorage.setItem('registered_users', JSON.stringify(existingUsers));

      alert('Sign up successful! Please log in.');
      setIsLoginView(true);
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

          {isLoginView && (
            <p className="auth-toggle-text">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
          )}
      </div>
    </div>
  );
};

export default AuthForm;