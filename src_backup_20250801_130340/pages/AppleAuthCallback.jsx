import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';

const AppleAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Parse the URL search params
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const id_token = searchParams.get('id_token');
        
        if (!code || !id_token) {
          throw new Error('Invalid callback parameters');
        }

        // Handle the callback with authService
        const result = await authService.handleSocialAuth('apple', {
          token: id_token,
          code: code,
          state: state
        });

        if (result.success) {
          navigate('/dashboard');
        } else {
          navigate(state === 'signup' ? '/signup' : '/login', {
            state: { error: 'Apple authentication failed' }
          });
        }
      } catch (error) {
        console.error('Apple auth callback error:', error);
        navigate('/login', {
          state: { error: 'Authentication failed' }
        });
      }
    };

    handleCallback();
  }, [navigate, location]);

  return (
    <div className="auth-callback">
      <div className="loading-spinner">
        <span>Completing authentication...</span>
      </div>
    </div>
  );
};

export default AppleAuthCallback;
