import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GoUpButton } from '@/components/go-up-button';
import { ThemeToggle } from '@/components/theme-toggle';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet';
import Button from '@/components/Button';
import HeroBanner from '@/components/pricing/HeroBanner';
import PricingSection from '@/components/pricing/PricingSection';
import CallToAction from '@/components/pricing/CallToAction';
import AddPlanDialog from '@/components/pricing/AddPlanDialog';

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

// Default pricing plans
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
  
  // Load pricing plans from localStorage or use defaults
  useEffect(() => {
    const savedPlans = localStorage.getItem('pricingPlans');
    if (savedPlans) {
      setPricingPlans(JSON.parse(savedPlans));
    } else {
      setPricingPlans(defaultPlans);
    }
  }, []);
  
  // Save pricing plans to localStorage when they change
  useEffect(() => {
    if (pricingPlans.length > 0) {
      localStorage.setItem('pricingPlans', JSON.stringify(pricingPlans));
    }
  }, [pricingPlans]);
  
  // Animation for revealing elements on scroll
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
      {/* SEO Metadata */}
      <Helmet>
        <title>Digital Services | Premium Web Development Solutions</title>
        <meta name="description" content="Choose from our range of premium digital services including website development, app creation and e-commerce solutions at competitive prices." />
        <meta name="keywords" content="web development, digital services, app development, website pricing, portfolio website, ecommerce website" />
      </Helmet>
      
      <Header />
      
      {/* Theme Toggle - Fixed position with improved accessibility */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle className="motion-safe:animate-fade-in" />
      </div>
      
      <GoUpButton />
      
      <main className="flex-grow">
        <HeroBanner />
        
        <PricingSection 
          pricingPlans={pricingPlans}
          onDeleteCard={handleDeleteCard}
          onEditCard={handleEditCard}
          onAddCardClick={() => setIsAddingCard(true)}
        />
        
        <CallToAction />
      </main>
      
      <Footer />
      
      {/* Add New Plan Dialog - Now using the refactored component */}
      <AddPlanDialog
        isOpen={isAddingCard}
        onClose={() => setIsAddingCard(false)}
        onAdd={handleAddCard}
        planData={newCardData}
        setPlanData={setNewCardData}
        handleFeatureChange={handleFeatureChange}
        addFeature={addFeature}
        removeFeature={removeFeature}
      />
    </div>
  );
};

export default Index;
