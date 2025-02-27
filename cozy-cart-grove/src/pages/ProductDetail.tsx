
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '@/lib/api';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const data = await getProductById(parseInt(id));
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : index < rating 
              ? 'text-yellow-400 fill-yellow-400 opacity-50' 
              : 'text-muted-foreground'
        }`} 
      />
    ));
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to products
        </Link>
        
        {isLoading || !product ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <div 
                className={`absolute inset-0 bg-muted animate-pulse ${
                  imageLoaded ? 'opacity-0' : 'opacity-100'
                }`}
              ></div>
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain object-center p-8"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            
            <div className="animate-fade-in">
              <div className="mb-2">
                <Badge variant="outline" className="rounded-sm">
                  {product.category}
                </Badge>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-display font-semibold mb-2">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {renderStars(product.rating.rate)}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating.count} reviews)
                </span>
              </div>
              
              <div className="text-2xl font-semibold mb-6">
                ${product.price.toFixed(2)}
              </div>
              
              <div className="prose prose-sm mb-6 text-muted-foreground">
                <p>{product.description}</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <span className="w-12 text-center mx-2">
                    {quantity}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="w-full sm:w-auto mb-4"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-sm font-medium mb-2">Product Details</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Category: {product.category}</li>
                  <li>Rating: {product.rating.rate}/5</li>
                  <li>In Stock: Yes</li>
                  <li>Shipping: Free standard shipping</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
