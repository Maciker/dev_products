
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/api';
import { Product } from '@/lib/types';
import ProductCard from '../ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await getFeaturedProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-2">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Hand-picked favorites for your consideration
            </p>
          </div>
          
          <Button variant="ghost" asChild className="mt-4 sm:mt-0 group">
            <Link to="/products">
              View All 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-background rounded-lg overflow-hidden border">
                <Skeleton className="h-60 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} featured />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
