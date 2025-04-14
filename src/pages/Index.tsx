import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';
import Button from '@/components/Button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { GoUpButton } from '@/components/go-up-button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const defaultImages = [
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80'
];

const defaultPlans: PricingPlan[] = [
  {
    id: uuidv4(),
    title: "Digital's Live service",
    subtitle: "For individuals",
    price: "₹1,999",
    features: [
      "Complete website development",
      "Mobile responsive design",
      "Contact form integration",
      "5 pages setup",
      "Basic SEO setup",
      "1 revision included"
    ],
    buttonText: "Get Started",
    variant: 'default',
    image: defaultImages[0]
  },
  {
    id: uuidv4(),
    title: "Advanced Plan",
    subtitle: "For businesses",
    price: "₹3,999",
    features: [
      "Complete website development",
      "Mobile responsive design",
      "Contact form & live chat",
      "10 pages setup",
      "Advanced SEO optimization",
      "3 revisions included",
      "Social media integration"
    ],
    buttonText: "Get Started",
    variant: 'featured',
    image: defaultImages[1]
  },
  {
    id: uuidv4(),
    title: "Custom Portfolio",
    subtitle: "For creatives",
    price: "₹4,999",
    features: [
      "Portfolio website design",
      "Mobile responsive design",
      "Gallery/project showcase",
      "8 pages setup",
      "SEO optimization",
      "2 revisions included",
      "Contact form integration"
    ],
    buttonText: "Get Started",
    variant: 'default',
    image: defaultImages[2]
  },
  {
    id: uuidv4(),
    title: "Personal Blog",
    subtitle: "For content creators",
    price: "₹2,499",
    features: [
      "Blog website setup",
      "Mobile responsive design",
      "Content management system",
      "3 post templates",
      "Basic SEO setup",
      "Newsletter integration",
      "1 revision included"
    ],
    buttonText: "Get Started",
    variant: 'default',
    image: defaultImages[3]
  },
  {
    id: uuidv4(),
    title: "Pro WordPress Theme",
    subtitle: "For medium businesses",
    price: "₹14,999",
    features: [
      "Premium WordPress theme",
      "Mobile responsive design",
      "E-commerce functionality",
      "15 pages setup",
      "Advanced SEO package",
      "4 revisions included",
      "Social media integration",
      "Google Analytics setup"
    ],
    buttonText: "Get Started",
    variant: 'default',
    image: defaultImages[4]
  },
  {
    id: uuidv4(),
    title: "E-commerce Basic",
    subtitle: "For online stores",
    price: "₹9,999",
    features: [
      "E-commerce store setup",
      "Mobile responsive design",
      "Up to 50 products",
      "Payment gateway integration",
      "Basic inventory management",
      "2 revisions included",
      "Basic SEO setup"
    ],
    buttonText: "Get Started",
    variant: 'default',
    image: defaultImages[5]
  },
  {
    id: uuidv4(),
    title: "Android App Basic",
    subtitle: "For businesses",
    price: "₹8,999",
    features: [
      "Basic Android app development",
      "User authentication",
      "Basic content features",
      "Push notifications",
      "Google Play submission",
      "1 revision included"
    ],
    buttonText: "Get Started",
    variant: 'default',
    image: defaultImages[6]
  },
  {
    id: uuidv4(),
    title: "Android App Premium",
    subtitle: "For startups",
    price: "₹19,999",
    features: [
      "Full Android app development",
      "User authentication",
      "Advanced features",
      "Push notifications",
      "API integrations",
      "Admin dashboard",
      "3 revisions",
      "Google Play submission"
    ],
    buttonText: "Get Started",
    variant: 'default',
    image: defaultImages[7]
  },
  {
    id: uuidv4(),
    title: "Let's Talk",
    subtitle: "Custom solution",
    price: "Custom",
    features: [
      "Personalized consultation",
      "Custom requirements",
      "Tailored solution",
      "Custom features",
      "Premium support",
      "Multiple revisions",
      "End-to-end development"
    ],
    buttonText: "Contact Us",
    variant: 'default',
    image: defaultImages[8]
  }
];

const Index = () => {
  const headerAnimation = useScrollAnimation();
  const sectionAnimation = useScrollAnimation();
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardData, setNewCardData] = useState<Omit<PricingPlan, 'id'>>({
    title: '',
    subtitle: '',
    price: '',
    features: [''],
    buttonText: 'Get Started',
    variant: 'default',
    image: null
  });
  
  useEffect(() => {
    const savedPlans = localStorage.getItem('pricingPlans');
    if (savedPlans) {
      setPricingPlans(JSON.parse(savedPlans));
    } else {
      setPricingPlans(defaultPlans);
    }
  }, []);
  
  useEffect(() => {
    if (pricingPlans.length > 0) {
      localStorage.setItem('pricingPlans', JSON.stringify(pricingPlans));
    }
  }, [pricingPlans]);
  
  useEffect(() => {
    const handleScroll = () => {
      const reveal = document.querySelectorAll('.reveal-on-scroll');
      for (let i = 0; i < reveal.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveal[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveal[i].classList.add('revealed');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleDeleteCard = (id: string) => {
    setPricingPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
  };
  
  const handleEditCard = (id: string, data: Omit<PricingPlan, 'id'>) => {
    setPricingPlans(prevPlans => 
      prevPlans.map(plan => 
        plan.id === id ? { ...plan, ...data } : plan
      )
    );
  };
  
  const handleAddCard = () => {
    const newCard: PricingPlan = {
      id: uuidv4(),
      ...newCardData
    };
    setPricingPlans(prev => [...prev, newCard]);
    setIsAddingCard(false);
    setNewCardData({
      title: '',
      subtitle: '',
      price: '',
      features: [''],
      buttonText: 'Get Started',
      variant: 'default',
      image: null
    });
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...newCardData.features];
    updatedFeatures[index] = value;
    setNewCardData({...newCardData, features: updatedFeatures});
  };
  
  const addFeature = () => {
    setNewCardData({...newCardData, features: [...newCardData.features, '']});
  };
  
  const removeFeature = (index: number) => {
    const updatedFeatures = [...newCardData.features];
    updatedFeatures.splice(index, 1);
    setNewCardData({...newCardData, features: updatedFeatures});
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-theme-beige dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <GoUpButton />
      
      <main className="flex-grow">
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
                  onClick={() => setIsAddingCard(true)}
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
                  onDelete={handleDeleteCard}
                  onEdit={handleEditCard}
                />
              ))}
            </div>
          </div>
        </section>
        
        <section className="bg-theme-green dark:bg-theme-navy text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-6 reveal-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ready to Get Started?
              </h2>
              <p className="text-lg opacity-90">
                Contact us today and let's discuss how we can help you achieve your goals.
              </p>
              <div className="pt-4">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="mx-auto bg-white text-theme-green hover:bg-theme-light-beige dark:bg-gray-200 dark:hover:bg-gray-100"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
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
                value={newCardData.title}
                onChange={(e) => setNewCardData({...newCardData, title: e.target.value})}
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
                value={newCardData.subtitle}
                onChange={(e) => setNewCardData({...newCardData, subtitle: e.target.value})}
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
                value={newCardData.price}
                onChange={(e) => setNewCardData({...newCardData, price: e.target.value})}
                className="col-span-3"
                placeholder="e.g. ₹1,999"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                value={newCardData.image || ''}
                onChange={(e) => setNewCardData({...newCardData, image: e.target.value})}
                className="col-span-3"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right mt-2">
                Features
              </Label>
              <div className="col-span-3 space-y-2">
                {newCardData.features.map((feature, index) => (
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
                      disabled={newCardData.features.length <= 1}
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
            <Button type="button" onClick={() => setIsAddingCard(false)} variant="outline">
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleAddCard}
              disabled={!newCardData.title || !newCardData.subtitle || !newCardData.price || newCardData.features.some(f => !f.trim())}
            >
              Add Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
