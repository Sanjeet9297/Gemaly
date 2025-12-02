const Logo = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Logo Symbol - Interlocking G's/Rings */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4">
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-teal-500"
        >
          {/* Interlocking rings/G's design */}
          <path
            d="M28 6C16.954 6 8 14.954 8 26C8 37.046 16.954 46 28 46C33.523 46 38.523 43.836 42.198 40.264"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M28 6C39.046 6 48 14.954 48 26C48 37.046 39.046 46 28 46C22.477 46 17.477 43.836 13.802 40.264"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx="28"
            cy="26"
            r="14"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </div>
      {/* Brand Name */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight mb-1.5 sm:mb-2">GEMLAY</h1>
      {/* Tagline */}
      <p className="text-xs sm:text-sm text-gray-500 font-sans mb-1.5 sm:mb-2">Pure Diamond Elegance</p>
      {/* Dotted line */}
      <div className="w-28 sm:w-32 h-px border-t border-dotted border-gray-300"></div>
    </div>
  );
};

export default Logo;

