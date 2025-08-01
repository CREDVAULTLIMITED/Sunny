import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/forgot-password.css';
import authService from '../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.requestPasswordReset(email);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message || 'Failed to send password reset email');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1>Reset your password</h1>
        
        {!success ? (
          <>
            <p className="instructions">
              Enter your email address and we'll send you instructions to reset your password.
            </p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="forgot-password-form">
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <button
                type="submit"
                className="reset-btn"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send reset instructions'}
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <h2>Check your email</h2>
            <p>We have sent password reset instructions to {email}</p>
            <p className="note">If you don't see the email, check your spam folder.</p>
          </div>
        )}

        <div className="back-to-login">
          Remember your password? <Link to="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
