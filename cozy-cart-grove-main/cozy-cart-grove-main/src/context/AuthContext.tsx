
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AuthState, User } from '../lib/types';
import { toast } from "sonner";

// Define available actions
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Create the context
interface AuthContextProps {
  state: AuthState;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: parsedUser });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Update localStorage when auth state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  // Login function
  const login = async (username: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      // In a real app, this would make an API call
      // For demo purposes, we'll simulate a successful login
      const user: User = {
        id: 1,
        username,
        email: `${username}@example.com`,
        token: 'fake_jwt_token',
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      toast.success("Successfully logged in");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      toast.error(`Login failed: ${errorMessage}`);
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    dispatch({ type: 'REGISTER_START' });
    try {
      // In a real app, this would make an API call
      // For demo purposes, we'll simulate a successful registration
      const user: User = {
        id: Math.floor(Math.random() * 1000),
        username,
        email,
        token: 'fake_jwt_token',
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
      toast.success("Registration successful");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'REGISTER_FAILURE', payload: errorMessage });
      toast.error(`Registration failed: ${errorMessage}`);
    }
  };

  // Logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success("You have been logged out");
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
