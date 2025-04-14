
import React from 'react';
import { Edit, X } from 'lucide-react';

interface PricingCardActionsProps {
  isHovered: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const PricingCardActions: React.FC<PricingCardActionsProps> = ({ 
  isHovered, 
  onEdit, 
  onDelete 
}) => {
  if (!onEdit && !onDelete) return null;
  
  return (
    <>
      {onDelete && (
        <button 
          onClick={onDelete}
          className="absolute top-2 right-2 z-10 rounded-full bg-red-500 text-white p-1 opacity-0 transition-opacity duration-200 hover:bg-red-600 group-hover:opacity-100"
          aria-label="Delete card"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      
      {onEdit && (
        <button 
          onClick={onEdit}
          className="absolute top-2 right-10 z-10 rounded-full bg-theme-navy dark:bg-theme-beige dark:text-theme-navy text-white p-1 opacity-0 transition-opacity duration-200 hover:bg-theme-dark-green group-hover:opacity-100"
          aria-label="Edit card"
        >
          <Edit className="h-4 w-4" />
        </button>
      )}
    </>
  );
};

export default PricingCardActions;
