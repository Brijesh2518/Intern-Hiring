import { Internship, User } from './types';

const API_BASE_URL = 'http://localhost:8000/api'; // Assuming Django runs on port 8000

// --- Helper for making authenticated requests ---
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};


// --- API Functions ---

// --- Authentication ---
// Note: You'll need to implement these endpoints in Django, 
// likely using Django REST Framework with TokenAuthentication or Simple JWT.
export const login = async (email: string, password?: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Invalid email or password.' }));
    throw new Error(errorData.detail || 'Login failed.');
  }

  const data = await response.json(); // Expects { token: '...', user: {...} }
  localStorage.setItem('authToken', data.token);
  return data.user;
};

export const register = async (email: string, password?: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Django's User model uses 'username', let's send email as username too.
        body: JSON.stringify({ email, username: email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Registration failed.' }));
        throw new Error(errorData.email?.[0] || errorData.username?.[0] || errorData.detail || 'Registration failed.');
    }
    
    // After registering, we log the user in to get a token and user data
    return login(email, password);
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('authToken');
  // Optional: You could also have a backend endpoint to invalidate the token
  // await fetch(`${API_BASE_URL}/auth/logout/`, { method: 'POST', headers: getAuthHeaders() });
  return Promise.resolve();
};

export const checkSession = async (): Promise<User | null> => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/user/`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      localStorage.removeItem('authToken'); // Token is invalid
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Session check failed:", error);
    return null;
  }
};

// --- User Data ---
export const getUserById = async (userId: number): Promise<User | null> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/`, { headers: getAuthHeaders() });
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return response.json();
}

export const applyForInternship = async (userId: number, internshipId: number): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/apply/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ internship_id: internshipId }),
    });
    if (!response.ok) {
        throw new Error('Failed to apply for internship');
    }
    return response.json(); // Expects updated user object in response
}


// --- Internship Data (CRUD) ---
export const getInternships = async (): Promise<Internship[]> => {
  const response = await fetch(`${API_BASE_URL}/internships/`);
  if (!response.ok) {
    throw new Error('Failed to fetch internships');
  }
  const data = await response.json();
  // Backend might store skills as a comma-separated string. Convert it to an array.
  return data.map((internship: any) => ({
    ...internship,
    skills: Array.isArray(internship.skills) ? internship.skills : String(internship.skills || '').split(',').map((s: string) => s.trim()).filter(Boolean),
  }));
};

export const createInternship = async (data: Omit<Internship, 'id'>): Promise<Internship> => {
    const payload = {
        ...data,
        skills: data.skills.join(', '), // Convert skills array to string for the backend
    };
    const response = await fetch(`${API_BASE_URL}/internships/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        throw new Error('Failed to create internship');
    }
    const newInternship = await response.json();
    // Convert skills string from response back to array for frontend state
    return { ...newInternship, skills: newInternship.skills.split(',').map((s:string) => s.trim()) };
};

export const updateInternship = async (data: Internship): Promise<Internship> => {
    const payload = {
        ...data,
        skills: data.skills.join(', '), // Convert skills array to string for the backend
    };
    const response = await fetch(`${API_BASE_URL}/internships/${data.id}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        throw new Error('Failed to update internship');
    }
    const updatedInternship = await response.json();
    // Convert skills string from response back to array for frontend state
    return { ...updatedInternship, skills: updatedInternship.skills.split(',').map((s:string) => s.trim()) };
};

export const deleteInternship = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/internships/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to delete internship');
    }
    // A successful DELETE request typically returns no content
};
