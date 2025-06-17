import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Shield, ShieldOff, Search, Filter, ArrowLeft } from 'lucide-react';
import { User, CreateUserData, UpdateUserData, Permission } from '../types/User';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

// Mock data - in production this would come from your backend
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
    name: 'João Silva',
    email: 'joao.silva@arcelormittal.com',
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
    name: 'Maria Santos',
    email: 'maria.santos@arcelormittal.com',
    role: 'operator',
    status: 'active',
    createdAt: '2024-01-03',
    lastLogin: '2024-01-13',
    permissions: [
      { id: '2', name: 'view_production', description: 'View production data', module: 'production' },
      { id: '4', name: 'view_energy', description: 'View energy consumption', module: 'energy' },
      { id: '6', name: 'view_inventory', description: 'View inventory levels', module: 'inventory' }
    ]
  },
  {
    id: '4',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@arcelormittal.com',
    role: 'operator',
    status: 'inactive',
    createdAt: '2024-01-04',
    lastLogin: '2024-01-10',
    permissions: [
      { id: '2', name: 'view_production', description: 'View production data', module: 'production' },
      { id: '6', name: 'view_inventory', description: 'View inventory levels', module: 'inventory' }
    ]
  }
];

const availablePermissions: Permission[] = [
  { id: '1', name: 'manage_users', description: 'Gerenciar usuários e permissões', module: 'users' },
  { id: '2', name: 'view_production', description: 'Visualizar dados de produção', module: 'production' },
  { id: '3', name: 'manage_production', description: 'Gerenciar dados de produção', module: 'production' },
  { id: '4', name: 'view_energy', description: 'Visualizar consumo energético', module: 'energy' },
  { id: '5', name: 'manage_energy', description: 'Gerenciar dados energéticos', module: 'energy' },
  { id: '6', name: 'view_inventory', description: 'Visualizar níveis de estoque', module: 'inventory' },
  { id: '7', name: 'manage_inventory', description: 'Gerenciar estoque', module: 'inventory' },
  { id: '8', name: 'generate_reports', description: 'Gerar relatórios', module: 'reports' }
];

export default function UserManagement() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [createUserData, setCreateUserData] = useState<CreateUserData>({
    name: '',
    email: '',
    password: '',
    role: 'operator',
    permissions: []
  });

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter]);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Date.now().toString(),
      name: createUserData.name,
      email: createUserData.email,
      role: createUserData.role,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      permissions: availablePermissions.filter(p => createUserData.permissions.includes(p.id))
    };

    setUsers([...users, newUser]);
    setCreateUserData({ name: '', email: '', password: '', role: 'operator', permissions: [] });
    setShowCreateModal(false);
  };

  const handleDeleteUser = (userId: string) => {
    if (userId === currentUser?.id) {
      alert('Você não pode deletar sua própria conta!');
      return;
    }
    
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleToggleStatus = (userId: string) => {
    if (userId === currentUser?.id) {
      alert('Você não pode alterar o status da sua própria conta!');
      return;
    }

    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleUpdatePermissions = (userId: string, newPermissions: string[]) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, permissions: availablePermissions.filter(p => newPermissions.includes(p.id)) }
        : user
    ));
    setShowPermissionsModal(false);
    setSelectedUser(null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'operator': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar ao Dashboard</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Usuários</h1>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
          >
            <Plus className="h-5 w-5" />
            <span>Novo Usuário</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="all">Todas as Funções</option>
              <option value="admin">Administrador</option>
              <option value="manager">Gerente</option>
              <option value="operator">Operador</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
            <div className="flex items-center text-sm text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              {filteredUsers.length} usuário(s) encontrado(s)
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Função
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Último Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissões
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role === 'admin' ? 'Administrador' : 
                         user.role === 'manager' ? 'Gerente' : 'Operador'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('pt-BR') : 'Nunca'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.permissions.length} permissão(ões)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowPermissionsModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="Gerenciar Permissões"
                      >
                        <Shield className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`${user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                        title={user.status === 'active' ? 'Desativar' : 'Ativar'}
                        disabled={user.id === currentUser?.id}
                      >
                        {user.status === 'active' ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Deletar Usuário"
                        disabled={user.id === currentUser?.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create User Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Criar Novo Usuário</h2>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome</label>
                  <input
                    type="text"
                    value={createUserData.name}
                    onChange={(e) => setCreateUserData({ ...createUserData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={createUserData.email}
                    onChange={(e) => setCreateUserData({ ...createUserData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Senha</label>
                  <input
                    type="password"
                    value={createUserData.password}
                    onChange={(e) => setCreateUserData({ ...createUserData, password: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Função</label>
                  <select
                    value={createUserData.role}
                    onChange={(e) => setCreateUserData({ ...createUserData, role: e.target.value as any })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  >
                    <option value="operator">Operador</option>
                    <option value="manager">Gerente</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
                  >
                    Criar Usuário
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Permissions Modal */}
        {showPermissionsModal && selectedUser && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Gerenciar Permissões - {selectedUser.name}
              </h2>
              <div className="space-y-4">
                {Object.entries(
                  availablePermissions.reduce((acc, permission) => {
                    if (!acc[permission.module]) acc[permission.module] = [];
                    acc[permission.module].push(permission);
                    return acc;
                  }, {} as Record<string, Permission[]>)
                ).map(([module, permissions]) => (
                  <div key={module} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 capitalize">
                      {module === 'users' ? 'Usuários' :
                       module === 'production' ? 'Produção' :
                       module === 'energy' ? 'Energia' :
                       module === 'inventory' ? 'Estoque' :
                       module === 'reports' ? 'Relatórios' : module}
                    </h3>
                    <div className="space-y-2">
                      {permissions.map((permission) => (
                        <label key={permission.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            defaultChecked={selectedUser.permissions.some(p => p.id === permission.id)}
                            onChange={(e) => {
                              const currentPermissions = selectedUser.permissions.map(p => p.id);
                              const newPermissions = e.target.checked
                                ? [...currentPermissions, permission.id]
                                : currentPermissions.filter(id => id !== permission.id);
                              
                              setSelectedUser({
                                ...selectedUser,
                                permissions: availablePermissions.filter(p => newPermissions.includes(p.id))
                              });
                            }}
                            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                            <div className="text-xs text-gray-500">{permission.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => handleUpdatePermissions(selectedUser.id, selectedUser.permissions.map(p => p.id))}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
                >
                  Salvar Permissões
                </button>
                <button
                  onClick={() => {
                    setShowPermissionsModal(false);
                    setSelectedUser(null);
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}