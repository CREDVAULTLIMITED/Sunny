// src/services/authSDK.js
class AuthSDK {
  async register(userData) {
    try {
      // For development purposes, simulate a successful registration
      // In production, this would make an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      if (!userData.email || !userData.password) {
        throw new Error('Email and password are required');
      }
      
      // Simulate successful registration
      return {
        success: true,
        data: {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          businessName: userData.businessName,
          businessType: userData.businessType,
          phoneNumber: userData.phoneNumber
        }
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Registration failed'
      };
    }
  }

  async login(email, password) {
    try {
      // For development purposes, simulate a successful login
      // In production, this would make an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Simulate successful login
      return {
        success: true,
        data: {
          token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9),
          user: {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            email: email,
            firstName: 'John',
            lastName: 'Doe'
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Login failed'
      };
    }
  }
}

export const sdk = new AuthSDK();

