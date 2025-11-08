
import React from 'react';
import { User, View } from '../types';

interface HeaderProps {
  currentUser: User | null;
  setView: (view: View) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, setView, onLogout }) => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => setView('home')} className="flex-shrink-0 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              InternNest
            </button>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <button onClick={() => setView('home')} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Home
            </button>
            {currentUser ? (
              <>
                <button onClick={() => setView(currentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard')} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Dashboard
                </button>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setView('login')}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setView('register')}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
