import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome, {user.username}</h1>
          <button onClick={logout} className="bg-red-500 text-white p-2 rounded">
            Logout
          </button>
        </div>
        <FileUpload />
        <FileList />
      </div>
    </div>
  );
};

export default Dashboard;