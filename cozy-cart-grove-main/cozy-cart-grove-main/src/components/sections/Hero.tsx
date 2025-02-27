
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-muted/30 to-transparent"
        aria-hidden="true"
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Summer Collection 2023
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 tracking-tight">
            Discover Minimalist Essentials
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our curated collection of timeless pieces designed for modern living.
            Quality craftsmanship, sustainable materials, and thoughtful details.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="group"
              asChild
            >
              <Link to="/products">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              asChild
            >
              <Link to="/products">
                Explore Collection
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
