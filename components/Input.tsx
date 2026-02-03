import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`relative mb-6 ${className}`}>
      <label 
        className="absolute -top-2.5 left-3 px-1 bg-popx-bg text-xs font-medium text-popx-primary z-10"
      >
        {label}
        {props.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        className={`w-full h-11 px-4 border rounded-lg bg-transparent outline-none transition-colors text-sm text-popx-text
          ${error 
            ? 'border-red-500 focus:border-red-600' 
            : 'border-gray-300 focus:border-popx-primary'
          } placeholder-gray-400`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1 ml-1 block">{error}</span>}
    </div>
  );
};