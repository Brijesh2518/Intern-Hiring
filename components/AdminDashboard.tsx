
import React, { useState, useEffect } from 'react';
import { Internship } from '../types';
import { INTERNSHIPS } from '../constants';
import Modal from './Modal';

// Defined outside the main component to prevent re-creation on re-renders.
const InternshipForm: React.FC<{
  onSubmit: (internship: Omit<Internship, 'id'> | Internship) => void;
  onClose: () => void;
  internship?: Internship | null;
}> = ({ onSubmit, onClose, internship }) => {
  const [formData, setFormData] = useState({
    title: internship?.title || '',
    domain: internship?.domain || '',
    description: internship?.description || '',
    duration: internship?.duration || '',
    stipend: internship?.stipend || '',
    skills: internship?.skills.join(', ') || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
    };

    if (internship) {
      onSubmit({ ...processedData, id: internship.id });
    } else {
      onSubmit(processedData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">{internship ? 'Edit Internship' : 'Add New Internship'}</h2>
      <div className="space-y-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        <input name="domain" value={formData.domain} onChange={handleChange} placeholder="Domain" required className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        <input name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" required className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        <input name="stipend" value={formData.stipend} onChange={handleChange} placeholder="Stipend" required className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma-separated)" required className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">{internship ? 'Save Changes' : 'Add Internship'}</button>
      </div>
    </form>
  );
};


const AdminDashboard: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);

  useEffect(() => {
    setInternships(INTERNSHIPS);
  }, []);

  const handleAdd = () => {
    setEditingInternship(null);
    setIsModalOpen(true);
  };

  const handleEdit = (internship: Internship) => {
    setEditingInternship(internship);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      setInternships(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleFormSubmit = (data: Omit<Internship, 'id'> | Internship) => {
    if ('id' in data) { // Editing
      setInternships(prev => prev.map(i => (i.id === data.id ? data : i)));
    } else { // Adding
      const newInternship: Internship = { ...data, id: Date.now() };
      setInternships(prev => [newInternship, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={handleAdd} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Add Internship
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Domain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {internships.map(internship => (
              <tr key={internship.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{internship.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{internship.domain}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{internship.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button onClick={() => handleEdit(internship)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">Edit</button>
                  <button onClick={() => handleDelete(internship.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <InternshipForm 
            onSubmit={handleFormSubmit} 
            onClose={() => setIsModalOpen(false)} 
            internship={editingInternship}
          />
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;
