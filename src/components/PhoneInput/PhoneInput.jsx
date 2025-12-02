const PhoneInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="w-full mb-4">
      <div className="relative flex items-center bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3">
        {/* India Flag */}
        <div className="flex items-center gap-2 mr-2">
          <div className="w-6 h-4 relative flex-shrink-0">
            {/* India Flag SVG */}
            <svg
              width="24"
              height="16"
              viewBox="0 0 24 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Saffron */}
              <rect width="24" height="5.33" fill="#FF9933" />
              {/* White */}
              <rect y="5.33" width="24" height="5.33" fill="#FFFFFF" />
              {/* Green */}
              <rect y="10.67" width="24" height="5.33" fill="#138808" />
              {/* Ashoka Chakra */}
              <circle cx="12" cy="8" r="2" fill="#000080" />
              <circle cx="12" cy="8" r="1.5" fill="#FFFFFF" />
              <circle cx="12" cy="8" r="0.5" fill="#000080" />
            </svg>
          </div>
          {/* Country Code */}
          <span className="text-gray-700 font-medium text-base">+91</span>
        </div>
        {/* Input Field */}
        <input
          type="tel"
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Enter phone number"}
          className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-base"
          maxLength="10"
        />
      </div>
    </div>
  );
};

export default PhoneInput;

