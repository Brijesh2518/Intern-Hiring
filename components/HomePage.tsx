
import React from 'react';
import { INTERNSHIPS } from '../constants';
import InternshipCard from './InternshipCard';
import { View } from '../types';

interface HomePageProps {
  setView: (view: View) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setView }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Launch Your Tech Career with
          <span className="block text-indigo-600 dark:text-indigo-400">InternNest</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          Gain valuable hands-on experience through our virtual internships. Work on real-world projects, develop your skills, and build your portfolio.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setView('register')}
            className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Internships Section */}
      <section id="internships" className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Available Internships</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {INTERNSHIPS.map(internship => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
