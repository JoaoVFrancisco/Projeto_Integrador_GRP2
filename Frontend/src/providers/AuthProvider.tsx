import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const loadUser = async () => {
    try {
      const { data } = await api.get('/usuarios/me');
      setUser(data);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      loadUser();
    }
  }, []);

  const login = async (login: string, senha: string) => {
    const { data } = await api.post('/auth/login', { login, senha });
    localStorage.setItem('token', data.token);
    await loadUser();
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // ... (isAdmin, hasPermission mantêm a mesma lógica)

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}