
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '../ui/SearchBar';
import CategoryFilter from '../ui/CategoryFilter';

const Navbar: React.FC = () => {
  const { state: { isAuthenticated, user } } = useAuth();
  const { toggleCart, getCartItemsCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [window.location.pathname]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  
  const cartItemsCount = getCartItemsCount();
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="font-display font-semibold text-xl">
              Minimalist
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="text-sm font-medium animated-underline">
                Home
              </Link>
              <Link to="/products" className="text-sm font-medium animated-underline">
                Shop
              </Link>
              <div className="relative group">
                <span className="text-sm font-medium cursor-pointer animated-underline">
                  Categories
                </span>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-background border 
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <CategoryFilter displayAsDropdown />
                </div>
              </div>
            </nav>
            
            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleSearch} aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon" onClick={() => toggleCart()} aria-label="Shopping cart">
                <div className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </Button>
              
              {isAuthenticated ? (
                <Link to="/account">
                  <Button variant="ghost" size="icon" aria-label="Account">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={() => toggleCart()} aria-label="Shopping cart">
                <div className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Menu">
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-30 bg-background transition-transform transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto pt-20 px-4 pb-8 h-full flex flex-col">
          <nav className="flex-1 flex flex-col space-y-6 items-center justify-center text-center">
            <Link to="/" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Shop
            </Link>
            <div className="w-full max-w-xs">
              <CategoryFilter onClick={() => setIsMobileMenuOpen(false)} />
            </div>
            <Button 
              variant="outline" 
              onClick={toggleSearch} 
              className="w-full max-w-xs flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              Search Products
            </Button>
          </nav>
          
          <div className="mt-auto pt-6 flex justify-center">
            {isAuthenticated ? (
              <Link to="/account" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="default">My Account</Button>
              </Link>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="default">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Search overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-sm transition-opacity duration-300 ${
          isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto h-full flex flex-col pt-20 px-4">
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" onClick={toggleSearch} aria-label="Close search">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl">
              <SearchBar onSearch={() => setIsSearchOpen(false)} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer to push content below fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
