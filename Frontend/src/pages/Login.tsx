import React, { useState } from 'react';
import { Factory } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// ============================================================================
// COMPONENTE PRINCIPAL - Login
// ============================================================================

export default function Login() {
  // ========================================================================
  // HOOKS E ESTADO - Gerenciamento de estado do componente
  // ========================================================================
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // ========================================================================
  // HANDLERS - Funções de manipulação de eventos
  // ========================================================================
  
  // Handler para submissão do formulário de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // ========================================================================
  // RENDERIZAÇÃO - Interface do usuário
  // ========================================================================
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* ================================================================ */}
      {/* HEADER - Logo e título da página */}
      {/* ================================================================ */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center space-x-2">
          <Factory className="h-12 w-12 text-green-600" />
          <span className="text-3xl font-bold text-gray-900">Lopes Solutions</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Faça login na sua conta
        </h2>
        
        {/* ============================================================== */}
        {/* INFORMAÇÕES DE TESTE - Contas disponíveis para demonstração */}
        {/* ============================================================== */}
        <div className="mt-4 text-center">
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-sm text-green-800 font-medium mb-2">Contas de Teste:</p>
            <div className="text-xs text-green-700 space-y-1">
              <div><strong>Admin:</strong> admin@lopessolutions.com</div>
              <div><strong>Gerente:</strong> manager@lopessolutions.com</div>
              <div><strong>Operador:</strong> operator@lopessolutions.com</div>
              <div className="mt-2"><strong>Senha:</strong> qualquer senha</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* FORMULÁRIO DE LOGIN - Campos de entrada e validação */}
      {/* ================================================================ */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Exibição de erros */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            {/* Campo: Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Campo: Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Opções adicionais */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Lembrar de mim
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            {/* Botão de submissão */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}