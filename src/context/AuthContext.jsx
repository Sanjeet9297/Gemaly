import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (phoneNumber) => {
    try {
      setError(null);
      const response = await authService.sendOTP(phoneNumber);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
      throw err;
    }
  };

  const verifyOTP = async (phoneNumber, otp) => {
    try {
      setError(null);
      const response = await authService.verifyOTP(phoneNumber, otp);
      
      if (response.success) {
        const userData = {
          phone: phoneNumber,
          ...response.user
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.token);
        return response;
      }
      throw new Error(response.message || 'OTP verification failed');
    } catch (err) {
      setError(err.message || 'OTP verification failed');
      throw err;
    }
  };

  const loginWithGoogle = async (credentialResponse) => {
    try {
      setError(null);
      const response = await authService.googleLogin(credentialResponse.credential);
      
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        return response;
      }
      throw new Error(response.message || 'Google login failed');
    } catch (err) {
      setError(err.message || 'Google login failed');
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    loading,
    error,
    login,
    verifyOTP,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

