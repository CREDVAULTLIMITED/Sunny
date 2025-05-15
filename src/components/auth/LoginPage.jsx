import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import SunnyLogo from '../../assets/images/Sunny logo.svg';

import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For development purposes, use hardcoded credentials
    // This simulates a successful login without needing the server
    localStorage.setItem('sunnyAuthToken', 'mock-jwt-token');
    localStorage.setItem('user', JSON.stringify({
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      accountType: 'individual'
    }));
    
    // Call onLogin callback
    login('mock-jwt-token', {
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      accountType: 'individual'
    });
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src={SunnyLogo} alt="Sunny Payments" height="40" />
              <span>Sunny</span>
            </div>
          </div>
        </div>
      </header>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-content">
            <div className="auth-form-header">
              <h1>Welcome back</h1>
              <p>Log in to your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    autoComplete="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    autoComplete="current-password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="password-toggle" 
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="eye-off-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                      </svg>
                    ) : (
                      <svg className="eye-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                    )}
                  </button>
                </div>
                <div className="password-options">
                  <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
                </div>
              </div>
              
              <div className="form-check">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    name="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-label">Remember me</span>
                </label>
              </div>
              
              <button type="submit" className="btn btn-primary btn-block">Log in</button>
            </form>
            
            <div className="auth-footer">
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
          </div>
          
          <div className="auth-image">
            <div className="auth-image-content">
              <div className="auth-image-logo">
                <img src={SunnyLogo} alt="Sunny Payments" height="60" />
              </div>
              <h2>Welcome back to Sunny</h2>
              <p>Log in to manage your payments, view transactions, and access your account settings.</p>
              
              <div className="auth-image-value-props">
                <div className="auth-image-value-prop">
                  <h3>Secure access</h3>
                  <p>Your data is protected with enterprise-grade security and encryption.</p>
                </div>
                
                <div className="auth-image-value-prop">
                  <h3>Real-time dashboard</h3>
                  <p>Monitor your transactions and payments in real-time with detailed analytics.</p>
                </div>
                
                <div className="auth-image-value-prop">
                  <h3>24/7 support</h3>
                  <p>Our support team is available around the clock to assist you with any questions.</p>
                </div>
              </div>
              
              <div className="auth-image-features">
                <div className="auth-image-feature">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                  </svg>
                  <span>Secure authentication</span>
                </div>
                <div className="auth-image-feature">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path fill="currentColor" d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  <span>Fast access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;