
import { toast } from "@/hooks/use-toast";

// Type definitions
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock JWT token storage
// In a real app, you would use httpOnly cookies
const tokenStorageKey = 'app_auth_token';

// Mock users for demo purposes
// In a real app, this would be handled by your backend
const mockUsers = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'Demo User',
    password: 'password123'
  }
];

// Check if user is logged in
export const checkAuth = (): AuthState => {
  const token = localStorage.getItem(tokenStorageKey);
  
  if (!token) {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false
    };
  }

  try {
    // Mock JWT parsing
    // In a real app, you would verify the JWT signature
    const payload = JSON.parse(atob(token.split('.')[1]));
    const user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name
    };

    return {
      user,
      isAuthenticated: true,
      isLoading: false
    };
  } catch (error) {
    localStorage.removeItem(tokenStorageKey);
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false
    };
  }
};

// Login function
export const login = async (email: string, password: string): Promise<AuthState> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));

  // Find user with matching credentials
  const user = mockUsers.find(u => u.email === email && u.password === password);

  if (!user) {
    toast({
      title: "Authentication failed",
      description: "Invalid email or password",
      variant: "destructive"
    });
    throw new Error('Invalid credentials');
  }

  // Create a mock JWT token
  const token = createMockJwt(user);
  localStorage.setItem(tokenStorageKey, token);

  toast({
    title: "Welcome back!",
    description: `Logged in as ${user.name}`,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    },
    isAuthenticated: true,
    isLoading: false
  };
};

// Register function
export const register = async (email: string, password: string, name: string): Promise<AuthState> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));

  // Check if user already exists
  if (mockUsers.some(u => u.email === email)) {
    toast({
      title: "Registration failed",
      description: "Email already in use",
      variant: "destructive"
    });
    throw new Error('Email already in use');
  }

  // Create new user
  const newUser = {
    id: (mockUsers.length + 1).toString(),
    email,
    name,
    password
  };

  // Add user to mock database
  mockUsers.push(newUser);

  // Create a mock JWT token
  const token = createMockJwt(newUser);
  localStorage.setItem(tokenStorageKey, token);

  toast({
    title: "Account created",
    description: "Your account has been successfully created",
  });

  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    },
    isAuthenticated: true,
    isLoading: false
  };
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem(tokenStorageKey);
  
  toast({
    title: "Logged out",
    description: "You have been successfully logged out",
  });
};

// Helper to create a mock JWT token
function createMockJwt(user: any): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    email: user.email,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60  // 24 hours
  }));
  
  // In a real app, you would sign this with a secret key
  const signature = btoa('mockSignature');
  
  return `${header}.${payload}.${signature}`;
}
