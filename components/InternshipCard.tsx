
import React from 'react';
import { Internship } from '../types';

interface InternshipCardProps {
  internship: Internship;
  onApply?: (id: number) => void;
  isApplied?: boolean;
}

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full">
    {children}
  </span>
);

const InternshipCard: React.FC<InternshipCardProps> = ({ internship, onApply, isApplied }) => {
  const { id, title, domain, description, duration, stipend, skills } = internship;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase">{domain}</p>
        <h3 className="text-xl font-bold mt-2 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>
        <div className="flex flex-wrap">
          {skills.map(skill => <Tag key={skill}>{skill}</Tag>)}
        </div>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
          <span>
            <strong>Duration:</strong> {duration}
          </span>
          <span>
            <strong>Stipend:</strong> {stipend}
          </span>
        </div>
        {onApply && (
           <button
             onClick={() => onApply(id)}
             disabled={isApplied}
             className={`w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
              isApplied
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
          >
            {isApplied ? 'Applied' : 'Apply Now'}
          </button>
        )}
      </div>
    </div>
  );
};

export default InternshipCard;
