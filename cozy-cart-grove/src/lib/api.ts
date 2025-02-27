
import { Product, User } from './types';

const API_URL = 'https://fakestoreapi.com';

// Authentication APIs
export const loginUser = async (username: string, password: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to login');
    }

    const data = await response.json();
    // Fake Store API only returns token, we'll simulate user data here
    return {
      id: 1, // Simulated
      email: username.includes('@') ? username : `${username}@example.com`,
      username,
      token: data.token,
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  // Fake Store API doesn't have a proper registration endpoint
  // We'll simulate a successful registration
  return {
    id: Math.floor(Math.random() * 1000),
    email,
    username,
    token: `fake_token_${Date.now()}`,
  };
};

// Product APIs
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products for category ${category}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    // FakeStore API doesn't have a featured products endpoint
    // So we'll get all products and pick a few random ones
    const allProducts = await getProducts();
    
    // Shuffle the array and take first 4 items
    return allProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    // FakeStore API doesn't have a search endpoint
    // So we'll get all products and filter them
    const allProducts = await getProducts();
    
    const lowercasedQuery = query.toLowerCase();
    return allProducts.filter(
      product => 
        product.title.toLowerCase().includes(lowercasedQuery) ||
        product.description.toLowerCase().includes(lowercasedQuery) ||
        product.category.toLowerCase().includes(lowercasedQuery)
    );
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
