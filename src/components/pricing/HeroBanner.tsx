
import React from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Button from '@/components/Button';

const HeroBanner: React.FC = () => {
  const headerAnimation = useScrollAnimation();
  
  return (
    <section className="bg-theme-beige dark:bg-gray-900 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerAnimation.ref}
          className={cn(
            "text-center max-w-3xl mx-auto space-y-6",
            headerAnimation.isIntersecting ? "animate-fade-in" : "opacity-0"
          )}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-theme-navy dark:text-white">
            Limited Period Offer
          </h1>
          <p className="text-xl text-theme-navy/70 dark:text-gray-300">
            Choose the perfect plan for your needs with our special time-limited pricing. Premium quality at affordable rates.
          </p>
          <div className="pt-4">
            <Button variant="primary" size="lg" className="mx-auto">
              View All Plans
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
