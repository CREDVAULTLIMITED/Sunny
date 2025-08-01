import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const SlackAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
        
        if (!code) {
          throw new Error('No authorization code received from Slack');
        }

        const result = await authService.handleSlackCallback(code);
        
        if (result.success && result.token && result.user) {
          await login(result.token, result.user);
          navigate('/dashboard', { replace: true });
        } else {
          throw new Error(result.message || 'Slack authentication failed');
        }
      } catch (err) {
        console.error('Slack auth error:', err);
        setError('Authentication failed. Please try again.');
        navigate('/login', { 
          replace: true,
          state: { error: 'Slack authentication failed. Please try again.' }
        });
      }
    };

    handleCallback();
  }, [location, login, navigate]);

  if (error) {
    return <div className="auth-error">{error}</div>;
  }

  return (
    <div className="auth-loading">
      <p>Completing Slack authentication...</p>
    </div>
  );
};

export default SlackAuthCallback;
