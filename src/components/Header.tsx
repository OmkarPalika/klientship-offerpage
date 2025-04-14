
import React from 'react';
import Button from './Button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const { ref, isIntersecting } = useScrollAnimation();
  
  return (
    <header className="w-full bg-theme-beige sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={cn(
            "flex items-center justify-between h-16",
            isIntersecting ? "animate-fade-in" : "opacity-0"
          )}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img 
                src="/lovable-uploads/0a4bc2a9-f45d-4b23-9eb5-ffa3df584910.png" 
                alt="Logo" 
                className="h-8 w-auto" 
              />
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <a href="#" className="text-theme-navy hover:text-theme-green px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-theme-navy hover:text-theme-green px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#" className="text-theme-navy hover:text-theme-green px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Pricing
              </a>
              <a href="#" className="text-theme-navy hover:text-theme-green px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About
              </a>
              <Button variant="primary" size="sm">
                Contact Us
              </Button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-theme-navy hover:text-theme-green focus:outline-none">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
