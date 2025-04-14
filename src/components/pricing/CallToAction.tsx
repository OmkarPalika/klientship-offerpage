
import React from 'react';
import Button from '@/components/Button';

const CallToAction: React.FC = () => {
  return (
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
  );
};

export default CallToAction;
