
import React from 'react';
import { Check } from 'lucide-react';

interface PricingFeatureListProps {
  features: string[];
  className?: string;
}

const PricingFeatureList: React.FC<PricingFeatureListProps> = ({ features, className }) => {
  return (
    <ul className={className}>
      {features.map((feature, index) => (
        <li key={index} className="flex items-start mb-2">
          <Check className="text-theme-green dark:text-green-400 shrink-0 h-5 w-5 mr-2 mt-0.5" />
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
  );
};

export default PricingFeatureList;
