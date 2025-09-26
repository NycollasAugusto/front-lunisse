export const Card = ({ children, className = '', variant = "default", ...props }) => {

  
    return (
      <div
        className={`shadow-lg p-6 rounded-xl transition-colors duration-300 glassmorphism ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };
  