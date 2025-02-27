
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/ui/RegisterForm';

const Register: React.FC = () => {
  const { state } = useAuth();
  
  // If user is already authenticated, redirect to home page
  if (state.isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-background border rounded-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-display font-semibold mb-2">Create an Account</h1>
            <p className="text-muted-foreground">
              Join us for a better shopping experience
            </p>
          </div>
          
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
