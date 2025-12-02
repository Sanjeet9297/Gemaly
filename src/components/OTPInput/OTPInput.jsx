import { useState, useRef, useEffect } from 'react';

const OTPInput = ({ length = 6, onComplete, onResend, phoneNumber }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all inputs are filled
    if (newOtp.every((digit) => digit !== '') && newOtp.length === length) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
    
    // If all filled, trigger onComplete
    if (newOtp.every((digit) => digit !== '') && newOtp.length === length) {
      onComplete(newOtp.join(''));
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center gap-2 sm:gap-3 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-colors"
          />
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">
          Didn't receive OTP?{' '}
          <button
            onClick={onResend}
            className="text-teal-500 hover:text-teal-600 underline font-medium"
          >
            Resend OTP
          </button>
        </p>
        <p className="text-xs text-gray-500">
          OTP sent to +91 {phoneNumber}
        </p>
      </div>
    </div>
  );
};

export default OTPInput;

