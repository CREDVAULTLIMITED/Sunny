import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const MicrosoftAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        
        if (!code) {
          throw new Error('No authorization code received');
        }

        const result = await authService.handleSocialAuth('microsoft', { code });
        
        if (result.success && result.token && result.user) {
          await login(result.token, result.user);
          navigate('/dashboard');
        } else {
          throw new Error(result.message || 'Authentication failed');
        }
      } catch (err) {
        console.error('Microsoft auth callback error:', err);
        setError('Authentication failed. Please try again.');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [location, login, navigate]);

  if (error) {
    return (
      <div className="auth-callback-page">
        <div className="error-container">
          <h2>Authentication Error</h2>
          <p>{error}</p>
          <p>Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-callback-page">
      <div className="loading-container">
        <h2>Authenticating...</h2>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default MicrosoftAuthCallback;
