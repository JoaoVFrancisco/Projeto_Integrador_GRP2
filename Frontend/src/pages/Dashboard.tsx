import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Factory, Power, AlertTriangle, Gauge, Package, FileText, Users, LogOut } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import ProductionReport from '../components/ProductionReport.js';

// Tipos para os dados
interface ProductionData {
  name: string;
  value: number;
  target: number;
}

interface InventoryData {
  name: string;
  stock: number;
  capacity: number;
}

interface StatsData {
  energyConsumption: number;
  targetEnergyConsumption: number;
  defectivePieces: number;
  totalProduction: number;
  reworkRate: string;
  operationalEfficiency: number;
}

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly' | 'annual'>('daily');
  const [showDataForm, setShowDataForm] = useState(false);
  const [dataType, setDataType] = useState<'production' | 'energy' | 'failures'>('production');

  // Busca dados de produção
  const { data: productionData = { daily: [], monthly: [], annual: [] }, isLoading: loadingProduction } = useQuery({
    queryKey: ['production', timeframe],
    queryFn: async () => {
      const { data } = await api.get(`/producao?periodo=${timeframe}`);
      return data;
    },
    onError: () => toast.error('Erro ao carregar dados de produção')
  });

  // Busca dados de estoque
  const { data: inventoryData = [], isLoading: loadingInventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const { data } = await api.get('/estoque');
      return data;
    },
    onError: () => toast.error('Erro ao carregar estoque')
  });

  // Busca estatísticas
  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data } = await api.get('/producao/stats');
      return data;
    },
    onError: () => toast.error('Erro ao carregar estatísticas')
  });

  // Envio de novos dados
  const handleSubmitData = async (formData: any) => {
    try {
      let endpoint = '';
      let payload = {};

      switch (dataType) {
        case 'production':
          endpoint = '/producao';
          payload = {
            periodo: timeframe,
            nome: formData.name,
            quantidade: formData.value,
            meta: formData.target
          };
          break;
        case 'energy':
          endpoint = '/energia';
          payload = {
            consumo: formData.energyConsumption,
            meta_consumo: formData.targetEnergyConsumption
          };
          break;
        case 'failures':
          endpoint = '/falhas';
          payload = {
            pecas_defeituosas: formData.defectivePieces,
            producao_total: formData.totalProduction
          };
          break;
      }

      await api.post(endpoint, payload);
      toast.success('Dados enviados com sucesso!');
      setShowDataForm(false);
    } catch (error) {
      toast.error('Erro ao enviar dados');
    }
  };

  if (loadingProduction || loadingInventory || loadingStats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-lg">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Factory className="h-8 w-8 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-900">Dashboard de Produção</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Bem-vindo, <span className="font-medium">{user?.name}</span>
            </span>
            
            {isAdmin() && (
              <Link
                to="/usuarios"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Users className="h-5 w-5" />
                <span>Gerenciar Usuários</span>
              </Link>
            )}
            
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Controles */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setShowDataForm(!showDataForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Package className="h-5 w-5" />
            <span>Adicionar Dados</span>
          </button>
          
          <PDFDownloadLink
            document={<ProductionReport 
              data={productionData[timeframe]} 
              inventoryData={inventoryData} 
              stats={stats} 
            />}
            fileName={`relatorio-producao-${format(new Date(), 'yyyy-MM-dd')}.pdf`}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
          >
            <FileText className="h-5 w-5" />
            <span>Gerar Relatório</span>
          </PDFDownloadLink>
        </div>

        {/* Formulário para adicionar dados */}
        {showDataForm && (
          <DataForm 
            dataType={dataType}
            setDataType={setDataType}
            timeframe={timeframe}
            onSubmit={handleSubmitData}
            onCancel={() => setShowDataForm(false)}
            productionTotal={productionData[timeframe].reduce((sum, item) => sum + item.value, 0)}
          />
        )}

        {/* Gráfico de Produção */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Visão Geral da Produção</h2>
            <TimeframeSelector 
              timeframe={timeframe}
              setTimeframe={setTimeframe}
            />
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productionData[timeframe]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Produção Real" 
                  stroke="#ea580c" 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  name="Meta de Produção" 
                  stroke="#4ade80" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            icon={<Power className="h-6 w-6 text-blue-500" />}
            title="Consumo Energético"
            value={`${stats.energyConsumption} MWh`}
            subtitle={`Meta: ${stats.targetEnergyConsumption} MWh`}
            color="blue"
          />
          
          <MetricCard
            icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
            title="Taxa de Retrabalho"
            value={`${stats.reworkRate}%`}
            subtitle={`${stats.defectivePieces} peças defeituosas`}
            color="red"
          />
          
          <MetricCard
            icon={<Gauge className="h-6 w-6 text-green-500" />}
            title="Eficiência Operacional"
            value={`${stats.operationalEfficiency}%`}
            subtitle="Efetividade geral"
            color="green"
          />
        </div>

        {/* Gráfico de Estoque */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 mb-6">
            <Package className="h-6 w-6 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-800">Níveis de Estoque</h2>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#ea580c" name="Estoque Atual" />
                <Bar dataKey="capacity" fill="#d1d5db" name="Capacidade Total" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componentes auxiliares
const TimeframeSelector = ({ timeframe, setTimeframe }: { timeframe: string, setTimeframe: (t: any) => void }) => (
  <div className="flex space-x-2">
    {(['daily', 'monthly', 'annual'] as const).map((t) => (
      <button
        key={t}
        onClick={() => setTimeframe(t)}
        className={`px-4 py-2 rounded ${timeframe === t ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
      >
        {t === 'daily' ? 'Diário' : t === 'monthly' ? 'Mensal' : 'Anual'}
      </button>
    ))}
  </div>
);

const MetricCard = ({ icon, title, value, subtitle, color }: { icon: React.ReactNode, title: string, value: string, subtitle: string, color: string }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md border-t-4 border-${color}-500`}>
    <div className="flex items-center space-x-3 mb-4">
      {icon}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <p className={`text-3xl font-bold text-${color}-500`}>{value}</p>
    <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
  </div>
);

// Componente DataForm seria criado em um arquivo separado
interface DataFormProps {
  dataType: string;
  setDataType: (type: 'production' | 'energy' | 'failures') => void;
  timeframe: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  productionTotal: number;
}

const DataForm = ({ dataType, setDataType, timeframe, onSubmit, onCancel, productionTotal }: DataFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    target: '',
    energyConsumption: '',
    targetEnergyConsumption: '',
    defectivePieces: '',
    totalProduction: productionTotal.toString()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Adicionar Novos Dados</h2>
      
      {/* Seletor de Tipo de Dados */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Dados</label>
        <div className="flex space-x-4">
          {(['production', 'energy', 'failures'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setDataType(type);
                if (type === 'failures') {
                  setFormData(prev => ({
                    ...prev,
                    totalProduction: productionTotal.toString()
                  }));
                }
              }}
              className={`px-4 py-2 rounded-md ${
                dataType === type
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type === 'production' ? 'Produção' : 
               type === 'energy' ? 'Energia' : 'Falhas'}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campos dinâmicos baseados no tipo de dados */}
        {dataType === 'production' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome/Período</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Produção Real</label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Meta de Produção</label>
              <input
                type="number"
                value={formData.target}
                onChange={(e) => setFormData({...formData, target: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
          </>
        )}

        {dataType === 'energy' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Consumo (MWh)</label>
              <input
                type="number"
                value={formData.energyConsumption}
                onChange={(e) => setFormData({...formData, energyConsumption: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Meta de Consumo (MWh)</label>
              <input
                type="number"
                value={formData.targetEnergyConsumption}
                onChange={(e) => setFormData({...formData, targetEnergyConsumption: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
          </>
        )}

        {dataType === 'failures' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Peças Defeituosas</label>
              <input
                type="number"
                value={formData.defectivePieces}
                onChange={(e) => setFormData({...formData, defectivePieces: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Produção Total</label>
              <input
                type="number"
                value={formData.totalProduction}
                onChange={(e) => setFormData({...formData, totalProduction: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-gray-50"
                required
                readOnly
              />
            </div>
          </>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
          >
            Adicionar Dados
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;