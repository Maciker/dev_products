
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import CartItem from './CartItem';

const CartSidebar: React.FC = () => {
  const { state, toggleCart, getCartTotal, clearCart } = useCart();
  const { items, isOpen } = state;
  const navigate = useNavigate();
  
  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const handleCheckout = () => {
    toggleCart(false);
    navigate('/checkout');
  };
  
  const cartTotal = getCartTotal();
  
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => toggleCart(false)}
      ></div>
      
      {/* Cart Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-96 max-w-full bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="text-lg font-medium">Your Cart</h2>
              <span className="text-sm text-muted-foreground">
                ({items.length} {items.length === 1 ? 'item' : 'items'})
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleCart(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Cart Items */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  toggleCart(false);
                  navigate('/products');
                }}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
          
          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t mt-auto">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="default" 
                  className="w-full flex items-center justify-center"
                  onClick={handleCheckout}
                >
                  Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      toggleCart(false);
                      navigate('/products');
                    }}
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="flex-1"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;
