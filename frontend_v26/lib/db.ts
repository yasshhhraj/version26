// Simple in-memory database for demonstration purposes.
// In a real application, this would be replaced by a connection to a real database (e.g., PostgreSQL, MongoDB).

export interface User {
  id: string;
  email: string;
  password: string; // In a real app, this should be hashed!
  name: string;
  college: string;
  roll: string;
  mobile: string;
  semester: string;
}

// Global variable to persist data across hot reloads in development (to some extent)
// Note: In serverless environments (like Vercel), this will reset on every request/cold start.
// For a persistent solution, use an external database.
const globalForDb = global as unknown as { users: User[] };

export const users: User[] = globalForDb.users || [];

if (process.env.NODE_ENV !== 'production') globalForDb.users = users;

export const findUserByEmail = (email: string): User | undefined => {
  return users.find((u) => u.email === email);
};

export const createUser = (user: Omit<User, 'id'>): User => {
  const newUser = { ...user, id: Date.now().toString() };
  users.push(newUser);
  return newUser;
};
