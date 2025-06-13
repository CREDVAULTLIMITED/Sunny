import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import '../styles/components/auth.css';
import '../styles/components/social-auth.css';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';
import AppleSignInScript from '../components/AppleSignInScript';

// Social auth icons
import appleIcon from '../assets/images/social/apple.svg';
import microsoftIcon from '../assets/images/social/microsoft.svg';
import slackIcon from '../assets/images/social/slack.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const result = await authService.login(formData.email, formData.password);
      if (result.success && result.token && result.user) {
        // Store auth data
        await login(result.token, result.user);
        
        // Check if we should redirect to a specific page
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setError(result.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else if (err.response?.status === 403) {
        setError('Account is locked. Please contact support.');
      } else {
        setError('Unable to login. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const result = await authService.handleSocialAuth('google', { token: credentialResponse.credential });
      if (result.success) {
        await login(result.token, result.user);
        navigate('/dashboard');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('Google login failed');
      console.error(err);
    }
  };

  const handleAppleLogin = async () => {
    try {
      // @ts-ignore - AppleID is injected by the AppleSignInScript
      const response = await window.AppleID.auth.signIn();
      const result = await authService.handleSocialAuth('apple', response);
      if (result.success) {
        await login(result.token, result.user);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Apple login failed');
      console.error(err);
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      // Redirect to Microsoft login
      window.location.href = `${process.env.REACT_APP_API_URL}/auth/microsoft`;
    } catch (err) {
      setError('Microsoft login failed');
      console.error(err);
    }
  };

  const handleSlackLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/slack`;
  };

  return (
    <div className="auth-container">
      <AppleSignInScript />
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to your account</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          
          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="auth-divider">
          <span>Or continue with</span>
        </div>
        
        <div className="social-auth-buttons">
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError('Google login failed')}
              type="standard"
              size="medium"
              theme="filled_black"
              shape="pill"
            />
          </GoogleOAuthProvider>
          
          <button onClick={handleAppleLogin} className="social-button">
            <img src={appleIcon} alt="Apple" />
            Sign in with Apple
          </button>
          
          <button onClick={handleMicrosoftLogin} className="social-button">
            <img src={microsoftIcon} alt="Microsoft" />
            Sign in with Microsoft
          </button>
          
          <button onClick={handleSlackLogin} className="social-button">
            <img src={slackIcon} alt="Slack" />
            Sign in with Slack
          </button>
        </div>
        
        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;