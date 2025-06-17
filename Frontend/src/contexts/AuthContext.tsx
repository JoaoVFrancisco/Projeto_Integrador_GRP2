import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  hasPermission: (module: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data - in production this would come from your backend
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@arcelormittal.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-01-15',
    permissions: [
      { id: '1', name: 'manage_users', description: 'Manage users and permissions', module: 'users' },
      { id: '2', name: 'view_production', description: 'View production data', module: 'production' },
      { id: '3', name: 'manage_production', description: 'Manage production data', module: 'production' },
      { id: '4', name: 'view_energy', description: 'View energy consumption', module: 'energy' },
      { id: '5', name: 'manage_energy', description: 'Manage energy data', module: 'energy' },
      { id: '6', name: 'view_inventory', description: 'View inventory levels', module: 'inventory' },
      { id: '7', name: 'manage_inventory', description: 'Manage inventory', module: 'inventory' },
      { id: '8', name: 'generate_reports', description: 'Generate reports', module: 'reports' }
    ]
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@arcelormittal.com',
    role: 'manager',
    status: 'active',
    createdAt: '2024-01-02',
    lastLogin: '2024-01-14',
    permissions: [
      { id: '2', name: 'view_production', description: 'View production data', module: 'production' },
      { id: '3', name: 'manage_production', description: 'Manage production data', module: 'production' },
      { id: '4', name: 'view_energy', description: 'View energy consumption', module: 'energy' },
      { id: '6', name: 'view_inventory', description: 'View inventory levels', module: 'inventory' },
      { id: '8', name: 'generate_reports', description: 'Generate reports', module: 'reports' }
    ]
  },
  {
    id: '3',
    name: 'Operator User',
    email: 'operator@arcelormittal.com',
    role: 'operator',
    status: 'active',
    createdAt: '2024-01-03',
    lastLogin: '2024-01-13',
    permissions: [
      { id: '2', name: 'view_production', description: 'View production data', module: 'production' },
      { id: '4', name: 'view_energy', description: 'View energy consumption', module: 'energy' },
      { id: '6', name: 'view_inventory', description: 'View inventory levels', module: 'inventory' }
    ]
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production this would call your backend API
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };

  const hasPermission = (permissionName: string): boolean => {
    return user?.permissions.some(p => p.name === permissionName) || false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}