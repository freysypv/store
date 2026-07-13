import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = () => {
  // State to toggle between 'login' and 'signup' views
  const [isLoginView, setIsLoginView] = useState(true);

  // State variables for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //  save to localstore / temporal for security 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoginView) {
      console.log('Logging in with:', { email: formData.email, password: formData.password });
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userPassword', formData.password);
    } else {
      console.log('Signing up with:', formData);
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userPassword', formData.password);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLoginView ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Name Field - Sign Up Only */}
          {!isLoginView && (
            <div className="auth-input">
              <label htmlFor="name">Username</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="auth-input">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="auth-input">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
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
