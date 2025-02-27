
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { CartState, CartItem, Product } from '../lib/types';
import { toast } from "sonner";

// Define available actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART'; payload?: boolean };

// Initial state
const initialState: CartState = {
  items: [],
  isOpen: false,
};

// Create the context
interface CartContextProps {
  state: CartState;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (isOpen?: boolean) => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // If item already exists, update its quantity
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        // If item doesn't exist, add it to the cart
        return {
          ...state,
          items: [...state.items, { product, quantity }],
        };
      }
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
      };
      
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // If quantity is 0 or negative, remove the item
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== productId),
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        ),
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
      
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: action.payload !== undefined ? action.payload : !state.isOpen,
      };
      
    default:
      return state;
  }
};

// Cart provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        parsedCart.items.forEach((item: CartItem) => {
          dispatch({
            type: 'ADD_ITEM',
            payload: { product: item.product, quantity: item.quantity },
          });
        });
      } catch (error) {
        console.error('Error parsing stored cart:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Update localStorage when cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ items: state.items }));
  }, [state.items]);

  // Add item to cart
  const addItem = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    toast.success(`${product.title} added to cart`);
  };

  // Remove item from cart
  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
    toast.success("Item removed from cart");
  };

  // Update item quantity
  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success("Cart cleared");
  };

  // Toggle cart sidebar
  const toggleCart = (isOpen?: boolean) => {
    dispatch({ type: 'TOGGLE_CART', payload: isOpen });
  };

  // Calculate cart total
  const getCartTotal = (): number => {
    return state.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  // Calculate number of items in cart
  const getCartItemsCount = (): number => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
