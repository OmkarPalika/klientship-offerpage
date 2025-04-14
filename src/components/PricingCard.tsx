
import React from 'react';
import Button from './Button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  buttonText: string;
  variant?: 'default' | 'featured';
  className?: string;
  image?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  price,
  features,
  buttonText,
  variant = 'default',
  className,
  image
}) => {
  const { ref, isIntersecting } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl stagger-card reveal-on-scroll",
        variant === 'featured' ? 'border-2 border-theme-green' : 'border border-theme-dark-beige',
        isIntersecting ? "revealed" : "",
        className
      )}
    >
      {/* Card header */}
      <div className={cn(
        "p-4 flex justify-between",
        variant === 'featured' ? 'bg-theme-green text-white' : 'bg-theme-dark-beige'
      )}>
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm opacity-80">{subtitle}</p>
        </div>
        {image && <img src={image} alt={title} className="h-12 w-auto" />}
      </div>

      {/* Card body */}
      <div className="px-6 py-7 bg-theme-light-beige">
        <div className="mb-6">
          <p className="text-sm text-theme-navy opacity-70">Starting at</p>
          <p className="text-3xl font-bold text-theme-navy">{price}</p>
        </div>
        
        <Button 
          variant={variant === 'featured' ? 'primary' : 'outline'} 
          fullWidth 
          className="mb-6"
        >
          {buttonText}
        </Button>

        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="text-theme-green shrink-0 h-5 w-5 mr-2 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
