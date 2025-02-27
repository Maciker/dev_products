
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import Layout from '@/components/layout/Layout';
import CartItem from '@/components/ui/CartItem';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const Cart: React.FC = () => {
  const { state, getCartTotal, clearCart } = useCart();
  const { items } = state;
  const cartTotal = getCartTotal();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-display font-semibold mb-8">
          Shopping Cart
        </h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 border rounded-lg overflow-hidden bg-background">
              <div className="p-4 border-b bg-muted/30">
                <h2 className="font-medium">Cart Items ({items.length})</h2>
              </div>
              
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.product.id} className="p-4">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t bg-muted/30 flex justify-between">
                <Button
                  variant="ghost"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                <div className="text-sm font-medium">
                  Subtotal: <span className="font-bold">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-6 bg-background h-fit">
              <h3 className="font-medium mb-4">Order Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                
                <div className="my-4 border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${(cartTotal * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4 flex items-center justify-center"
              >
                <Link to="/checkout">
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <div className="mt-6 text-xs text-center text-muted-foreground">
                <p>Secure checkout powered by Stripe</p>
                <p className="mt-1">Free shipping on all orders</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
