export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'operator';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: 'production' | 'energy' | 'inventory' | 'reports' | 'users';
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'operator';
  permissions: string[];
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: 'admin' | 'manager' | 'operator';
  status?: 'active' | 'inactive';
  permissions?: string[];
}