
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import CartSidebar from '../ui/CartSidebar';
import { useCart } from '@/context/CartContext';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { toggleCart } = useCart();
  
  // Close cart when route changes
  useEffect(() => {
    toggleCart(false);
  }, [location.pathname, toggleCart]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-8 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Minimalist Store. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors animated-underline">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors animated-underline">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors animated-underline">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
      <CartSidebar />
    </div>
  );
};

export default Layout;
