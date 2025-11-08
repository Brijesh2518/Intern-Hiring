
import React, { useState } from 'react';
import { User, Internship } from '../types';
import { INTERNSHIPS } from '../constants';
import InternshipCard from './InternshipCard';

interface UserDashboardProps {
  user: User;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user: initialUser }) => {
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [activeTab, setActiveTab] = useState<'available' | 'applied'>('available');

  const handleApply = (internshipId: number) => {
    const updatedUser = {
      ...currentUser,
      appliedInternships: [...currentUser.appliedInternships, internshipId],
    };
    setCurrentUser(updatedUser);

    const storedUsersRaw = localStorage.getItem('users');
    if (storedUsersRaw) {
      const users: User[] = JSON.parse(storedUsersRaw);
      const userIndex = users.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
    }
  };

  const appliedInternships = INTERNSHIPS.filter(internship => currentUser.appliedInternships.includes(internship.id));
  const availableInternships = INTERNSHIPS.filter(internship => !currentUser.appliedInternships.includes(internship.id));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome, {currentUser.email}!</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">This is your personal dashboard. Here you can find internships and track your applications.</p>
      
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('available')}
            className={`${
              activeTab === 'available'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Available Internships ({availableInternships.length})
          </button>
          <button
            onClick={() => setActiveTab('applied')}
            className={`${
              activeTab === 'applied'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            My Applications ({appliedInternships.length})
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'available' && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {availableInternships.length > 0 ? (
              availableInternships.map(internship => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  onApply={handleApply}
                  isApplied={currentUser.appliedInternships.includes(internship.id)}
                />
              ))
            ) : (
              <p className="text-center col-span-full">You have applied for all available internships!</p>
            )}
          </div>
        )}
        {activeTab === 'applied' && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {appliedInternships.length > 0 ? (
              appliedInternships.map(internship => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                />
              ))
            ) : (
              <p className="text-center col-span-full">You haven't applied for any internships yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
