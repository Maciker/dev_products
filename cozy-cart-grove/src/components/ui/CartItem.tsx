
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeItem, updateQuantity } = useCart();
  const { product, quantity } = item;
  
  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(product.id, newQuantity);
    }
  };
  
  return (
    <div className="flex py-4 border-b last:border-b-0 animate-fade-in">
      <div className="h-20 w-20 flex-shrink-0 bg-muted rounded overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.title} 
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <div>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-sm font-medium line-clamp-1 hover:underline">
                {product.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              ${product.price.toFixed(2)}
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => removeItem(product.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none"
              onClick={() => handleUpdateQuantity(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center text-sm">
              {quantity}
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none"
              onClick={() => handleUpdateQuantity(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="ml-auto font-medium">
            ${(product.price * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
