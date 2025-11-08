
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} InternNest. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Managed by @Brijesh Sharma & Savita Kumari.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
