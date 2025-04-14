
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className, 
  children, 
  ...props 
}) => {
  return (
    <button
      className={cn(
        'relative font-medium rounded-md transition-all duration-300 btn-hover-effect',
        // Variants
        variant === 'primary' && 'bg-theme-green text-white hover:bg-theme-dark-green',
        variant === 'secondary' && 'bg-theme-light-beige text-theme-navy hover:bg-theme-dark-beige',
        variant === 'outline' && 'bg-transparent border border-theme-green text-theme-green hover:bg-theme-green hover:text-white',
        // Sizes
        size === 'sm' && 'py-1.5 px-3 text-sm',
        size === 'md' && 'py-2.5 px-5',
        size === 'lg' && 'py-3 px-6 text-lg',
        // Full width
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
