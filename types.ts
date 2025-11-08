
export interface Internship {
  id: number;
  title: string;
  domain: string;
  description: string;
  duration: string;
  stipend: string;
  skills: string[];
}

export interface User {
  id: number;
  email: string;
  password?: string; // Should not be stored long-term, but needed for mock auth
  role: 'user' | 'admin';
  appliedInternships: number[]; // array of internship IDs
}

export type View = 'home' | 'login' | 'register' | 'user-dashboard' | 'admin-dashboard';
