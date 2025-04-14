
import React from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PricingCard from './PricingCard';
import Button from '@/components/Button';
import { Plus } from 'lucide-react';

interface PricingPlan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  buttonText: string;
  variant: 'default' | 'featured';
  image: string | null;
}

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
  onDeleteCard: (id: string) => void;
  onEditCard: (id: string, data: Omit<PricingPlan, 'id'>) => void;
  onAddCardClick: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ 
  pricingPlans, 
  onDeleteCard, 
  onEditCard,
  onAddCardClick
}) => {
  const sectionAnimation = useScrollAnimation();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={sectionAnimation.ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 space-y-4",
            sectionAnimation.isIntersecting ? "animate-fade-in" : "opacity-0"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-theme-navy dark:text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-theme-navy/70 dark:text-gray-300">
            No hidden fees, no surprises. Pick the plan that works for you.
          </p>
          
          <div className="pt-8">
            <Button 
              variant="primary" 
              className="mx-auto flex items-center gap-2" 
              onClick={onAddCardClick}
            >
              <Plus className="h-5 w-5" />
              Add New Plan
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              id={plan.id}
              title={plan.title}
              subtitle={plan.subtitle}
              price={plan.price}
              features={plan.features}
              buttonText={plan.buttonText}
              variant={plan.variant}
              image={plan.image || undefined}
              onDelete={onDeleteCard}
              onEdit={onEditCard}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
