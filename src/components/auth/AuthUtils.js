// Helper function to clear authentication state
export const clearAuth = () => {
  localStorage.removeItem('isAuthenticated');
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};