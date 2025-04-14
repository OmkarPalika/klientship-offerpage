
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';
import Button from '@/components/Button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const Index = () => {
  const headerAnimation = useScrollAnimation();
  const sectionAnimation = useScrollAnimation();
  
  // Initialize scroll animations
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
    // Trigger once on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const pricingPlans = [
    {
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
      image: null
    },
    {
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
      image: null
    },
    {
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
      image: null
    },
    {
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
      image: null
    },
    {
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
      image: null
    },
    {
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
      image: null
    },
    {
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
      image: null
    },
    {
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
      image: null
    },
    {
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
      image: null
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-theme-beige py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              ref={headerAnimation.ref}
              className={cn(
                "text-center max-w-3xl mx-auto space-y-6",
                headerAnimation.isIntersecting ? "animate-fade-in" : "opacity-0"
              )}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-theme-navy">
                Limited Period Offer
              </h1>
              <p className="text-xl text-theme-navy/70">
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
        
        {/* Pricing Grid Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              ref={sectionAnimation.ref}
              className={cn(
                "text-center max-w-3xl mx-auto mb-16 space-y-4",
                sectionAnimation.isIntersecting ? "animate-fade-in" : "opacity-0"
              )}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-theme-navy">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-theme-navy/70">
                No hidden fees, no surprises. Pick the plan that works for you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={index}
                  title={plan.title}
                  subtitle={plan.subtitle}
                  price={plan.price}
                  features={plan.features}
                  buttonText={plan.buttonText}
                  variant={plan.variant as 'default' | 'featured'}
                  image={plan.image || undefined}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="bg-theme-green text-white py-16">
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
                  className="mx-auto bg-white text-theme-green hover:bg-theme-light-beige"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
