import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requiredPermission?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAdmin = false, 
  requiredPermission 
}: ProtectedRouteProps) {
  const { user, isAdmin, hasPermission } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h2>
          <p className="text-gray-600 mb-4">Você não tem permissão para acessar esta página.</p>
          <p className="text-sm text-gray-500">Apenas administradores podem acessar o gerenciamento de usuários.</p>
        </div>
      </div>
    );
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Permissão Insuficiente</h2>
          <p className="text-gray-600 mb-4">Você não tem a permissão necessária para acessar esta funcionalidade.</p>
          <p className="text-sm text-gray-500">Permissão necessária: {requiredPermission}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}