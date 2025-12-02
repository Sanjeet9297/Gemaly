const Button = ({ children, onClick, disabled = false, className = "" }) => {
  const baseClasses = "w-full py-3.5 px-6 rounded-lg font-bold text-white text-sm uppercase transition-all duration-200 shadow-md";
  const disabledClasses = "bg-teal-300 cursor-not-allowed opacity-60";
  const enabledClasses = "bg-teal-500 hover:bg-teal-600 active:bg-teal-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${className}`.trim()}
    >
      {children}
    </button>
  );
};

export default Button;

