
import React, { useState, useRef } from 'react';
import Button from '../Button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useExpandDirection } from '@/hooks/useExpandDirection';
import PricingCardActions from './PricingCardActions';
import PricingFeatureList from './PricingFeatureList';
import PricingCardDialog from './PricingCardDialog';

interface PricingCardProps {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  buttonText: string;
  variant?: 'default' | 'featured';
  className?: string;
  image?: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, data: Omit<PricingCardProps, 'id' | 'onDelete' | 'onEdit'>) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  id,
  title,
  subtitle,
  price,
  features,
  buttonText,
  variant = 'default',
  className,
  image,
  onDelete,
  onEdit
}) => {
  const { ref: animationRef, isIntersecting } = useScrollAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const expandDirection = useExpandDirection(cardRef);
  
  const [editedData, setEditedData] = useState({
    title,
    subtitle,
    price,
    features: [...features],
    buttonText,
    variant,
    image: image || ''
  });

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  const handleDelete = () => {
    if (onDelete) onDelete(id);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (onEdit) {
      onEdit(id, {
        title: editedData.title,
        subtitle: editedData.subtitle,
        price: editedData.price,
        features: editedData.features,
        buttonText: editedData.buttonText,
        variant: editedData.variant as 'default' | 'featured',
        image: editedData.image || undefined,
      });
    }
    setIsEditing(false);
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...editedData.features];
    updatedFeatures[index] = value;
    setEditedData({...editedData, features: updatedFeatures});
  };
  
  const addFeature = () => {
    setEditedData({...editedData, features: [...editedData.features, '']});
  };
  
  const removeFeature = (index: number) => {
    const updatedFeatures = [...editedData.features];
    updatedFeatures.splice(index, 1);
    setEditedData({...editedData, features: updatedFeatures});
  };

  // Create a properly typed callback ref function
  const setRefs = React.useCallback((element: HTMLDivElement | null) => {
    // For the animation ref
    if (typeof animationRef === 'object' && animationRef !== null && 'current' in animationRef) {
      // If it's a RefObject
      (animationRef as React.RefObject<HTMLDivElement>).current = element;
    }
    
    // Set the card ref
    if (cardRef) {
      cardRef.current = element;
    }
  }, [animationRef]);

  return (
    <>
      <div
        ref={setRefs}
        className={cn(
          "rounded-lg overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl stagger-card reveal-on-scroll relative",
          variant === 'featured' ? 'border-2 border-theme-green dark:border-theme-green' : 'border border-theme-dark-beige dark:border-gray-700',
          isIntersecting ? "revealed" : "",
          className,
          "group",
          isHovered ? 'z-50' : 'z-10'
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Card Actions */}
        <PricingCardActions 
          isHovered={isHovered}
          onEdit={onEdit ? handleEdit : undefined}
          onDelete={onDelete ? handleDelete : undefined}
        />

        {/* Main Card Content */}
        <div className={cn(
          "transition-all duration-300",
          isHovered && "relative"
        )}>
          {/* Card Image */}
          {image && (
            <div className="w-full h-40 overflow-hidden">
              <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
            </div>
          )}

          {/* Card header */}
          <div className={cn(
            "p-4 flex justify-between",
            variant === 'featured' ? 'bg-theme-green text-white dark:bg-theme-green' : 'bg-theme-dark-beige dark:bg-theme-navy'
          )}>
            <div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-sm opacity-80">{subtitle}</p>
            </div>
          </div>

          {/* Card body */}
          <div className={cn(
            "px-6 py-7 bg-theme-light-beige dark:bg-gray-800 dark:text-gray-200",
          )}>
            <div className="mb-6">
              <p className="text-sm text-theme-navy dark:text-gray-400 opacity-70">Starting at</p>
              <p className="text-3xl font-bold text-theme-navy dark:text-white">{price}</p>
            </div>
            
            <Button 
              variant={variant === 'featured' ? 'primary' : 'outline'} 
              fullWidth 
              className="mb-6"
            >
              {buttonText}
            </Button>

            {/* Base feature list (only on mobile or when not hovered) */}
            <div className="md:hidden">
              <PricingFeatureList features={features} className="space-y-2" />
            </div>
          </div>
        </div>

        {/* Expanded content that appears on hover */}
        <div
          className={cn(
            "absolute top-0 bottom-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-theme-dark-beige dark:border-gray-700 px-6 py-6 transition-all duration-300",
            "md:flex md:flex-col",
            isHovered ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none",
            {
              "left-full w-[200%] rounded-l-none": expandDirection === 'right', 
              "right-full w-[200%] rounded-r-none": expandDirection === 'left',
              "-left-[50%] w-[200%]": expandDirection === 'even'
            }
          )}
        >
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xl font-bold text-theme-navy dark:text-white mb-4">{title} Features</h3>
            <PricingFeatureList features={features} className="space-y-3" />
            <div className="mt-8">
              <p className="mb-2 text-theme-navy dark:text-white font-semibold">Price:</p>
              <p className="text-2xl font-bold text-theme-green dark:text-green-400 mb-6">{price}</p>
              <Button 
                variant={variant === 'featured' ? 'primary' : 'outline'} 
                fullWidth 
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Dialog */}
      <PricingCardDialog
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Card"
        data={{
          title: editedData.title,
          subtitle: editedData.subtitle,
          price: editedData.price,
          buttonText: editedData.buttonText,
          image: editedData.image
        }}
        setData={setEditedData}
        onSave={handleSave}
        featureControls={{
          features: editedData.features,
          handleFeatureChange,
          addFeature,
          removeFeature
        }}
      />
    </>
  );
};

export default PricingCard;
