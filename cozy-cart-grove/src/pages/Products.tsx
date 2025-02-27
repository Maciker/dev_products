
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import CategoryFilter from '@/components/ui/CategoryFilter';
import SearchBar from '@/components/ui/SearchBar';
import { getProducts, getProductsByCategory, searchProducts } from '@/lib/api';
import { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      let data: Product[];
      
      if (searchQuery) {
        data = await searchProducts(searchQuery);
      } else if (categoryParam) {
        data = await getProductsByCategory(categoryParam);
      } else {
        data = await getProducts();
      }
      
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  }, [categoryParam, searchQuery]);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  // Get the title for the current view
  const getTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    } else if (categoryParam) {
      return categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
    } else {
      return 'All Products';
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-semibold mb-4">
            {getTitle()}
          </h1>
          
          <div className="mb-6">
            <SearchBar initialQuery={searchQuery || ''} />
          </div>
          
          <CategoryFilter selectedCategory={categoryParam || undefined} />
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="bg-background rounded-lg overflow-hidden border">
                <Skeleton className="h-60 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">
              {searchQuery 
                ? `No products match your search for "${searchQuery}".` 
                : 'No products available in this category.'}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
