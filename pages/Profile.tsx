import React from 'react';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { RoutePath } from '../types';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(RoutePath.WELCOME);
  };

  if (!user) {
    return (
      <Layout className="flex items-center justify-center">
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout className="bg-popx-bg">
      <div className="px-6 py-8 bg-white mb-auto h-full sm:h-auto sm:rounded-xl flex flex-col">
        <h1 className="text-xl font-medium text-popx-text mb-8">
          Account Settings
        </h1>

        <div className="flex items-start gap-5 mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              <img
                src={user.avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-popx-primary w-6 h-6 rounded-full flex items-center justify-center text-white border-2 border-white  hover:bg-popx-primaryDark transition-colors">
              <Camera size={12} />
            </button>
          </div>

          <div className="pt-2">
            <h2 className="text-lg font-bold text-popx-text">
              {user.fullName}
            </h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="text-sm text-gray-500 leading-relaxed border-t border-dashed border-gray-300 pt-6 border-b pb-6 mb-6">
          <p>{user.bio}</p>
        </div>

        <div className="mt-auto">
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </Layout>
  );
};