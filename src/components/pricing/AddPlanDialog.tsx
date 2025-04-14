
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
import Button from '@/components/Button';
import { X } from 'lucide-react';

interface PricingPlan {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  buttonText: string;
  variant: 'default' | 'featured';
  image: string | null;
}

interface AddPlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
  planData: PricingPlan;
  setPlanData: React.Dispatch<React.SetStateAction<PricingPlan>>;
  handleFeatureChange: (index: number, value: string) => void;
  addFeature: () => void;
  removeFeature: (index: number) => void;
}

const AddPlanDialog: React.FC<AddPlanDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
  planData,
  setPlanData,
  handleFeatureChange,
  addFeature,
  removeFeature
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Plan</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={planData.title}
              onChange={(e) => setPlanData({...planData, title: e.target.value})}
              className="col-span-3"
              placeholder="Plan Title"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subtitle" className="text-right">
              Subtitle
            </Label>
            <Input
              id="subtitle"
              value={planData.subtitle}
              onChange={(e) => setPlanData({...planData, subtitle: e.target.value})}
              className="col-span-3"
              placeholder="For whom"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              value={planData.price}
              onChange={(e) => setPlanData({...planData, price: e.target.value})}
              className="col-span-3"
              placeholder="e.g. ₹1,999"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="buttonText" className="text-right">
              Button Text
            </Label>
            <Input
              id="buttonText"
              value={planData.buttonText}
              onChange={(e) => setPlanData({...planData, buttonText: e.target.value})}
              className="col-span-3"
              placeholder="Get Started"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image URL
            </Label>
            <Input
              id="image"
              value={planData.image || ''}
              onChange={(e) => setPlanData({...planData, image: e.target.value})}
              className="col-span-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-2">
              Features
            </Label>
            <div className="col-span-3 space-y-2">
              {planData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1"
                    placeholder="Feature description"
                  />
                  <button 
                    onClick={() => removeFeature(index)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    type="button"
                    disabled={planData.features.length <= 1}
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
          <Button 
            type="button" 
            onClick={onAdd}
            disabled={!planData.title || !planData.subtitle || !planData.price || planData.features.some(f => !f.trim())}
          >
            Add Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlanDialog;
