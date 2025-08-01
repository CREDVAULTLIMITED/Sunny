import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Check if the user object is actually valid
    if (!loading && isAuthenticated && !user) {
      // If we have no user data despite being "authenticated", something's wrong
      console.error('Protected route: User data missing despite authentication');
      navigate('/login', { state: { from: location, error: 'Session expired. Please login again.' } });
    }
  }, [loading, isAuthenticated, user, navigate, location]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location, error: location.state?.error }} replace />;
  }

  return children;
};

export default ProtectedRoute;
