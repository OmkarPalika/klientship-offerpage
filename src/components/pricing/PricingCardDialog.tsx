
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "@/components/Button";
import { X } from 'lucide-react';

interface EditableFeature {
  features: string[];
  handleFeatureChange: (index: number, value: string) => void;
  addFeature: () => void;
  removeFeature: (index: number) => void;
}

interface PricingCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: {
    title: string;
    subtitle: string;
    price: string;
    buttonText: string;
    image: string;
  };
  setData: React.Dispatch<React.SetStateAction<any>>;
  onSave: () => void;
  featureControls: EditableFeature;
}

const PricingCardDialog: React.FC<PricingCardDialogProps> = ({
  isOpen,
  onClose,
  title,
  data,
  setData,
  onSave,
  featureControls
}) => {
  const { features, handleFeatureChange, addFeature, removeFeature } = featureControls;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => setData({...data, title: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subtitle" className="text-right">
              Subtitle
            </Label>
            <Input
              id="subtitle"
              value={data.subtitle}
              onChange={(e) => setData({...data, subtitle: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              value={data.price}
              onChange={(e) => setData({...data, price: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="buttonText" className="text-right">
              Button Text
            </Label>
            <Input
              id="buttonText"
              value={data.buttonText}
              onChange={(e) => setData({...data, buttonText: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image URL
            </Label>
            <Input
              id="image"
              value={data.image || ''}
              onChange={(e) => setData({...data, image: e.target.value})}
              className="col-span-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-2">
              Features
            </Label>
            <div className="col-span-3 space-y-2">
              {features.map((feature, index) => (
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
                    disabled={features.length <= 1}
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
          <Button type="button" onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="button" onClick={onSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PricingCardDialog;
