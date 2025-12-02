import axios from 'axios';

// API Base URL - Update this with your backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  // Send OTP to phone number
  sendOTP: async (phoneNumber) => {
    try {
      const response = await api.post('/auth/send-otp', {
        phone: `+91${phoneNumber}`,
      });
      return response.data;
    } catch (error) {
      // For demo purposes, simulate success
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to send OTP');
      }
      // Simulate API call for development
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'OTP sent successfully',
            // In production, OTP would be sent via SMS
          });
        }, 1000);
      });
    }
  },

  // Verify OTP
  verifyOTP: async (phoneNumber, otp) => {
    try {
      const response = await api.post('/auth/verify-otp', {
        phone: `+91${phoneNumber}`,
        otp,
      });
      return response.data;
    } catch (error) {
      // For demo purposes, accept any 6-digit OTP
      if (error.response) {
        throw new Error(error.response.data.message || 'Invalid OTP');
      }
      // Simulate API call for development
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (otp.length === 6) {
            resolve({
              success: true,
              message: 'OTP verified successfully',
              token: 'demo_token_' + Date.now(),
              user: {
                id: Date.now(),
                phone: `+91${phoneNumber}`,
                name: 'User',
              },
            });
          } else {
            reject(new Error('Invalid OTP'));
          }
        }, 1000);
      });
    }
  },

  // Google OAuth Login
  googleLogin: async (credential) => {
    try {
      const response = await api.post('/auth/google', {
        credential,
      });
      return response.data;
    } catch (error) {
      // For demo purposes, decode JWT and create user
      if (error.response) {
        throw new Error(error.response.data.message || 'Google login failed');
      }
      
      // Simulate Google login for development
      // In production, verify the credential on your backend
      return new Promise((resolve) => {
        setTimeout(() => {
          // Decode JWT token (simplified - in production, verify on backend)
          try {
            const payload = JSON.parse(atob(credential.split('.')[1]));
            resolve({
              success: true,
              message: 'Google login successful',
              token: 'google_token_' + Date.now(),
              user: {
                id: payload.sub || Date.now(),
                email: payload.email,
                name: payload.name || payload.given_name || 'User',
                picture: payload.picture,
                provider: 'google',
              },
            });
          } catch (err) {
            throw new Error('Invalid Google credential');
          }
        }, 1000);
      });
    }
  },
};

