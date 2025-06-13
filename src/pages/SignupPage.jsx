import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import '../styles/components/auth.css';
import '../styles/components/social-auth.css';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';
import AppleSignInScript from '../components/AppleSignInScript';

// Logo and social auth icons
import sunnyLogo from '../assets/images/sunny-logo.svg';
import appleIcon from '../assets/images/social/apple.svg';
import microsoftIcon from '../assets/images/social/microsoft.svg';
import slackIcon from '../assets/images/social/slack.svg';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    country: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'IN', name: 'India' },
    { code: 'BR', name: 'Brazil' },
    { code: 'ZA', name: 'South Africa' }
  ];

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!formData.fullName) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.country) {
      errors.country = 'Please select your country';
    }
    
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset all errors
    setError('');
    setValidationErrors({});
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // Additional password strength validation
      if (formData.password.length < 8) {
        setValidationErrors(prev => ({
          ...prev,
          password: 'Password must be at least 8 characters long'
        }));
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setValidationErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match'
        }));
        return;
      }

      const result = await authService.register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        country: formData.country
      });

      if (result.success) {
        if (result.requiresVerification) {
          // Redirect to email verification page
          navigate('/verify-email', { 
            state: { 
              email: formData.email,
              message: 'Please check your email to verify your account.'
            },
            replace: true
          });
        } else if (result.token && result.user) {
          // Direct login if verification not required
          await login(result.token, result.user);
          // Set up user in the application
          await login(result.token, {
            ...result.user,
            initialLogin: new Date().toISOString()
          });
          // Redirect to dashboard
          navigate('/dashboard', { replace: true });
        }
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      
      if (err.response?.status === 409) {
        setError('An account with this email already exists');
      } else if (err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors);
      } else if (err.response?.status === 429) {
        setError('Too many attempts. Please try again later.');
      } else {
        setError('Unable to create account. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider, response) => {
    setLoading(true);
    setError('');

    try {
      const result = await authService.handleSocialAuth(provider, response);
      if (result.success && result.token && result.user) {
        await login(result.token, result.user);
        navigate('/dashboard');
      } else {
        setError(result.message || 'Authentication failed');
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setError('An account with this email already exists');
      } else {
        setError('Authentication failed. Please try again.');
        console.error('Social auth error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    await handleSocialAuth('google', { token: credentialResponse.credential });
  };

  const handleAppleLogin = async (event) => {
    event.preventDefault();
    try {
      // @ts-ignore - AppleID is injected by the AppleSignInScript
      const response = await window.AppleID.auth.signIn();
      await handleSocialAuth('apple', response);
    } catch (error) {
      setError('Apple sign-in failed. Please try again.');
      console.error('Apple sign-in error:', error);
    }
  };

  const handleMicrosoftSignup = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/microsoft`;
  };

  const handleSlackLogin = async (event) => {
    event.preventDefault();
    // Redirect to Slack OAuth endpoint
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/slack`;
  };

  return (
    <div className="auth-container">
      <AppleSignInScript />
      <div className="auth-card">
        <div className="auth-header">
          <img src={sunnyLogo} alt="Sunny Logo" className="sunny-logo" style={{ height: '2.5rem', marginBottom: '1rem' }} />
          <h1>Create your account</h1>
          <p className="auth-subtitle">Join thousands of businesses using Sunny</p>
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
              placeholder="your@email.com" 
              required 
            />
            {validationErrors.email && <div className="validation-error">{validationErrors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="fullName">Full name</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe" 
              required 
            />
            {validationErrors.fullName && <div className="validation-error">{validationErrors.fullName}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••" 
              required 
            />
            {validationErrors.password && <div className="validation-error">{validationErrors.password}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••" 
              required 
            />
            {validationErrors.confirmPassword && <div className="validation-error">{validationErrors.confirmPassword}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <div className="country-select-container">
              <select 
                id="country" 
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select your country</option>
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            {validationErrors.country && <div className="validation-error">{validationErrors.country}</div>}
          </div>
          
          <div className="form-group">
            <label className="terms-checkbox">
              <input 
                type="checkbox" 
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              <span>I agree to the <Link to="/terms">Terms and Conditions</Link></span>
            </label>
            {validationErrors.agreeToTerms && <div className="validation-error">{validationErrors.agreeToTerms}</div>}
          </div>
          
          <button 
            type="submit" 
            className="btn-auth"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        
        <div className="auth-divider">
          <span>Or continue with</span>
        </div>
        
        <div className="social-auth-container">
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <div className="google-button">
              <GoogleLogin
                onSuccess={handleGoogleSignup}
                onError={() => setError('Google authentication failed')}
                theme="filled_black"
                width="100%"
                text="signup_with"
                shape="rectangular"
                size="large"
              />
            </div>
          </GoogleOAuthProvider>

          <div className="social-auth-buttons">
            <button 
              className="social-button apple"
              onClick={handleAppleLogin}
              aria-label="Sign up with Apple"
            >
              <img src={appleIcon} alt="Apple" />
              <span>Continue with Apple</span>
            </button>

            <button 
              className="social-button microsoft"
              onClick={handleMicrosoftSignup}
              aria-label="Sign up with Microsoft"
            >
              <img src={microsoftIcon} alt="Microsoft" />
              <span>Continue with Microsoft</span>
            </button>

            <button 
              className="social-button slack"
              onClick={handleSlackLogin}
              aria-label="Sign up with Slack"
            >
              <img src={slackIcon} alt="Slack" />
              <span>Continue with Slack</span>
            </button>
          </div>
        </div>
        
        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;