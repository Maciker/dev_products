import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  // Show a loading state while checking authentication
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-xl">Loading...</div>
    </div>
  );
};

export default Home;