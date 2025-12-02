import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../../components/Logo/Logo';
import PhoneInput from '../../components/PhoneInput/PhoneInput';
import Button from '../../components/Button/Button';
import SocialButton from '../../components/SocialButton/SocialButton';
import Link from '../../components/Link/Link';
import OTPInput from '../../components/OTPInput/OTPInput';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, verifyOTP, loginWithGoogle, error } = useAuth();

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  };

  const handleGetOTP = async () => {
    if (phoneNumber.length === 10) {
      setLoading(true);
      try {
        await login(phoneNumber);
        setShowOTP(true);
      } catch (err) {
        console.error('Error sending OTP:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOTPComplete = async (otp) => {
    setLoading(true);
    try {
      await verifyOTP(phoneNumber, otp);
      // Redirect or show success message
      window.location.href = '/dashboard'; // Update with your route
    } catch (err) {
      console.error('Error verifying OTP:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await login(phoneNumber);
    } catch (err) {
      console.error('Error resending OTP:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      await loginWithGoogle(credentialResponse);
      // Redirect or show success message
      window.location.href = '/dashboard'; // Update with your route
    } catch (err) {
      console.error('Error with Google login:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  const handleBackToPhone = () => {
    setShowOTP(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6 sm:py-8">
      {/* White Card Container - Responsive */}
      <div className="w-full max-w-md bg-white rounded-lg sm:rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
        {/* Logo Section */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <Logo />
        </div>
        
        {/* Login Title */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center mb-5 sm:mb-6">
          LOGIN / SIGN UP
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 text-center">{error}</p>
          </div>
        )}

        {!showOTP ? (
          <>
            {/* Phone Input */}
            <div className="mb-4 sm:mb-5">
              <PhoneInput
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
              />
            </div>
            
            {/* Terms and Conditions - Inline */}
            <div className="mb-5 sm:mb-6 text-center">
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                By continuing, I agree to the{' '}
                <Link href="/terms" className="text-xs sm:text-sm">
                  Terms of Use &{' '}
                </Link>
                <Link href="/privacy" className="text-xs sm:text-sm">
                  Privacy Policy.
                </Link>
              </p>
            </div>
            
            {/* Get OTP Button */}
            <div className="mb-5 sm:mb-6">
              <Button 
                onClick={handleGetOTP} 
                disabled={phoneNumber.length !== 10 || loading}
                className={loading ? 'opacity-50 cursor-not-allowed' : ''}
              >
                {loading ? 'Sending...' : 'GET OTP'}
              </Button>
            </div>
            
            {/* Sign Up Section */}
            <div className="text-center mb-5 sm:mb-6">
              <span className="text-xs sm:text-sm text-gray-700">Do not have an account? </span>
              <Link href="/signup" className="text-xs sm:text-sm">
                Sign up
              </Link>
            </div>
            
            {/* Divider */}
            <div className="relative mb-5 sm:mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs sm:text-sm text-gray-600">Or</span>
              </div>
            </div>
            
            {/* Social Media Section */}
            <div className="text-center mb-5 sm:mb-6">
              <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">Continue with social media</p>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  render={({ onClick, disabled }) => (
                    <SocialButton 
                      provider="google" 
                      onClick={onClick}
                      disabled={disabled || loading}
                    />
                  )}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* OTP Input Section */}
            <div className="mb-4 sm:mb-6">
              <OTPInput
                length={6}
                onComplete={handleOTPComplete}
                onResend={handleResendOTP}
                phoneNumber={phoneNumber}
              />
            </div>

            {/* Back Button */}
            <div className="text-center mb-4 sm:mb-6">
              <button
                onClick={handleBackToPhone}
                className="text-sm text-teal-500 hover:text-teal-600 underline"
                disabled={loading}
              >
                ← Change phone number
              </button>
            </div>
          </>
        )}
        
        {/* Help Section */}
        <div className="text-center mt-5 sm:mt-6">
          <span className="text-xs sm:text-sm text-gray-700">Having Trouble in logging in? </span>
          <Link href="/help" className="text-xs sm:text-sm">
            Get Help
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
