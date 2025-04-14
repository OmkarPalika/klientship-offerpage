
import React, { useState } from 'react';
import Button from './Button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Check, Edit, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  const { ref, isIntersecting } = useScrollAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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

  return (
    <>
      <div
        ref={ref}
        className={cn(
          "rounded-lg overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl stagger-card reveal-on-scroll",
          variant === 'featured' ? 'border-2 border-theme-green dark:border-theme-green' : 'border border-theme-dark-beige dark:border-gray-700',
          isIntersecting ? "revealed" : "",
          className,
          "relative"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Delete Button */}
        {onDelete && (
          <button 
            onClick={handleDelete}
            className="absolute top-2 right-2 z-10 rounded-full bg-red-500 text-white p-1 opacity-0 transition-opacity hover:bg-red-600"
            style={{ opacity: isHovered ? 1 : 0 }}
            aria-label="Delete card"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        
        {/* Edit Button */}
        {onEdit && (
          <button 
            onClick={handleEdit}
            className="absolute top-2 right-10 z-10 rounded-full bg-theme-navy dark:bg-theme-beige dark:text-theme-navy text-white p-1 opacity-0 transition-opacity hover:bg-theme-dark-green"
            style={{ opacity: isHovered ? 1 : 0 }}
            aria-label="Edit card"
          >
            <Edit className="h-4 w-4" />
          </button>
        )}

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
          isHovered ? "transform-gpu transition-all duration-300 ease-in-out" : ""
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

          <ul className={cn(
            "space-y-2 transition-all duration-300",
            isHovered ? "max-h-full opacity-100" : "max-h-60 overflow-hidden"
          )}>
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="text-theme-green dark:text-green-400 shrink-0 h-5 w-5 mr-2 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          
          {features.length > 4 && !isHovered && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-theme-light-beige dark:from-gray-800 to-transparent pointer-events-none" />
          )}
        </div>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={editedData.title}
                onChange={(e) => setEditedData({...editedData, title: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subtitle" className="text-right">
                Subtitle
              </Label>
              <Input
                id="subtitle"
                value={editedData.subtitle}
                onChange={(e) => setEditedData({...editedData, subtitle: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                value={editedData.price}
                onChange={(e) => setEditedData({...editedData, price: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="buttonText" className="text-right">
                Button Text
              </Label>
              <Input
                id="buttonText"
                value={editedData.buttonText}
                onChange={(e) => setEditedData({...editedData, buttonText: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                value={editedData.image}
                onChange={(e) => setEditedData({...editedData, image: e.target.value})}
                className="col-span-3"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right mt-2">
                Features
              </Label>
              <div className="col-span-3 space-y-2">
                {editedData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1"
                    />
                    <button 
                      onClick={() => removeFeature(index)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <Button 
                  onClick={addFeature} 
                  type="button" 
                  variant="outline" 
                  className="w-full mt-2"
                >
                  Add Feature
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setIsEditing(false)} variant="outline">
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PricingCard;
