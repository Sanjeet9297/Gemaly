const Link = ({ href, children, onClick, className = "" }) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <a
      href={href || "#"}
      onClick={handleClick}
      className={`text-teal-500 underline hover:text-teal-600 transition-colors cursor-pointer ${className}`}
    >
      {children}
    </a>
  );
};

export default Link;

