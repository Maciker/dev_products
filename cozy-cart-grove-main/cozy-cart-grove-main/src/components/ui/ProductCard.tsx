
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addItem } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };
  
  return (
    <div
      className={`group h-full bg-background border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 ${
        featured ? 'relative' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {featured && (
        <Badge className="absolute top-3 left-3 z-10">
          Featured
        </Badge>
      )}
      
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="product-image">
          <div 
            className={`absolute inset-0 bg-muted animate-pulse ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          ></div>
          <img
            src={product.image}
            alt={product.title}
            className={`lazy-image ${imageLoaded ? 'lazy-image-loaded' : 'lazy-image-loading'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 ${
              isHovered ? 'opacity-100' : ''
            } transition-opacity duration-300`}
          ></div>
          
          <div
            className={`absolute inset-x-0 bottom-0 p-3 flex justify-between items-center transform transition-transform duration-300 ${
              isHovered ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-background text-foreground hover:bg-background/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            
            <Link to={`/product/${product.id}`}>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-background text-foreground hover:bg-background/90"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-sm line-clamp-1">{product.title}</h3>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm font-semibold">${product.price.toFixed(2)}</div>
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-xs text-muted-foreground">{product.rating.rate} ({product.rating.count})</span>
            </div>
          </div>
          
          <div className="mt-2">
            <Badge variant="outline" className="rounded-sm text-xs">
              {product.category}
            </Badge>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
