import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'disabled';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = true, 
  className = '',
  ...props 
}) => {
  const baseStyles = "h-12 rounded-md font-medium transition-all duration-200 flex items-center justify-center text-sm sm:text-base";
  
  const variants = {
    primary: "bg-popx-primary text-white hover:bg-popx-primaryDark shadow-md hover:shadow-lg",
    secondary: "bg-popx-light text-popx-text hover:bg-opacity-80 font-semibold",
    disabled: "bg-popx-secondary text-white cursor-not-allowed",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={variant === 'disabled'}
      {...props}
    >
      {children}
    </button>
  );
};