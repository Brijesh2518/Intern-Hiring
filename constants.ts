
import { Internship, User } from './types';

export const INTERNSHIPS: Internship[] = [
  {
    id: 1,
    title: 'Frontend Web Developer',
    domain: 'Web Development',
    description: 'Work with modern frontend frameworks like React to build stunning user interfaces. Collaborate with UI/UX designers and backend developers to create a seamless user experience.',
    duration: '3 Months',
    stipend: 'Performance-based',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Git'],
  },
  {
    id: 2,
    title: 'Backend Developer (Django)',
    domain: 'Backend Development',
    description: 'Design and implement server-side logic, manage databases, and create robust APIs using Python and Django. A great opportunity to learn about scalability and security.',
    duration: '3 Months',
    stipend: 'Performance-based',
    skills: ['Python', 'Django', 'REST APIs', 'PostgreSQL', 'Docker'],
  },
  {
    id: 3,
    title: 'Mobile App Developer (React Native)',
    domain: 'App Development',
    description: 'Develop cross-platform mobile applications for iOS and Android using React Native. You will be responsible for the full development lifecycle from concept to deployment.',
    duration: '2 Months',
    stipend: 'Performance-based',
    skills: ['React Native', 'JavaScript', 'Redux', 'APIs', 'Firebase'],
  },
  {
    id: 4,
    title: 'Data Science Intern',
    domain: 'Data Science',
    description: 'Analyze large datasets to extract meaningful insights. Build predictive models and use machine learning techniques to solve real-world problems. Work with tools like Pandas, NumPy, and Scikit-learn.',
    duration: '4 Months',
    stipend: 'Performance-based',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'SQL', 'Jupyter'],
  },
  {
    id: 5,
    title: 'UI/UX Design Intern',
    domain: 'Design',
    description: 'Create intuitive and visually appealing user interfaces. Conduct user research, create wireframes and prototypes, and work closely with developers to implement your designs.',
    duration: '2 Months',
    stipend: 'Performance-based',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Wireframing'],
  },
    {
    id: 6,
    title: 'Cloud Engineering Intern (AWS)',
    domain: 'Cloud Computing',
    description: 'Gain hands-on experience with Amazon Web Services (AWS). Work on deploying, managing, and scaling applications in the cloud. Learn about services like EC2, S3, Lambda, and RDS.',
    duration: '3 Months',
    stipend: 'Performance-based',
    skills: ['AWS', 'Linux', 'Networking', 'Terraform', 'CI/CD'],
  }
];

export const MOCK_USERS: User[] = [
    { id: 1, email: 'admin@example.com', password: 'adminpassword', role: 'admin', appliedInternships: [] },
    { id: 2, email: 'user@example.com', password: 'userpassword', role: 'user', appliedInternships: [1, 4] },
];
