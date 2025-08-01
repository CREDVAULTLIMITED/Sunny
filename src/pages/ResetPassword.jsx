import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/pages/reset-password.css';
import authService from '../services/authService';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validatePasswords = () => {
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePasswords()) return;

    setLoading(true);
    try {
      const result = await authService.resetPassword(token, formData.password);
      if (result.success) {
        // Redirect to login with success message
        navigate('/login', { 
          state: { 
            message: 'Password reset successful. Please login with your new password.' 
          }
        });
      } else {
        setError(result.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordStrength = () => {
    if (!formData.password) return null;

    const strength = authService.validatePasswordStrength(formData.password);
    return (
      <div className={`password-strength ${strength.strength}`}>
        <div className="strength-bar">
          <div className="strength-fill" style={{ width: `${strength.score}%` }} />
        </div>
        <p className="strength-text">{strength.feedback[0]}</p>
      </div>
    );
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h1>Set new password</h1>
        <p className="instructions">
          Your new password must be different from previous passwords.
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="reset-password-form">
          <div className="form-group">
            <label htmlFor="password">New password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              required
            />
            {renderPasswordStrength()}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm new password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            className="reset-btn"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
