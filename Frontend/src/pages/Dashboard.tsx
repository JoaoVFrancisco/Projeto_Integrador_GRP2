import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Factory, Power, AlertTriangle, Gauge, 
  Package, FileText, RefreshCcw, Users, LogOut 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { format } from 'date-fns';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ProductionReport from '../components/ProductionReport';

// Tipos para os dados
interface ProductionData {
  data: string;
  quantidade_total: number;
  quantidade_usavel: number;
  consumo_energetico: number;
}

interface InventoryData {
  id: number;
  nome: string;
  quantidade: number;
  capacidade?: number;
}

interface Stats {
  energyConsumption: number;
  targetEnergyConsumption: number;
  defectivePieces: number;
  totalProduction: number;
  reworkRate: string;
  operationalEfficiency: number;
}

const Dashboard: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [productionData, setProductionData] = useState<ProductionData[]>([]);
  const [inventoryData, setInventoryData] = useState<InventoryData[]>([]);
  const [stats, setStats] = useState<Stats>({
    energyConsumption: 0,
    targetEnergyConsumption: 0,
    defectivePieces: 0,
    totalProduction: 0,
    reworkRate: '0',
    operationalEfficiency: 0
  });
  const [loading, setLoading] = useState({
    production: true,
    inventory: true,
    stats: true
  });
  const [error, setError] = useState<string | null>(null);

  // Buscar dados da produção
  const fetchProductionData = async () => {
    try {
      setLoading(prev => ({ ...prev, production: true }));
      const response = await api.get('/producao');
      setProductionData(response.data);
    } catch (err) {
      setError('Erro ao carregar dados de produção');
    } finally {
      setLoading(prev => ({ ...prev, production: false }));
    }
  };

  // Buscar dados de estoque
  const fetchInventoryData = async () => {
    try {
      setLoading(prev => ({ ...prev, inventory: true }));
      const response = await api.get('/estoque');
      // Adiciona capacidade padrão se não existir
      const dataWithCapacity = response.data.map((item: InventoryData) => ({
        ...item,
        capacidade: item.capacidade || 100
      }));
      setInventoryData(dataWithCapacity);
    } catch (err) {
      setError('Erro ao carregar dados de estoque');
    } finally {
      setLoading(prev => ({ ...prev, inventory: false }));
    }
  };

  // Buscar estatísticas
  const fetchStats = async () => {
    try {
      setLoading(prev => ({ ...prev, stats: true }));
      const [prodResponse, energyResponse, failuresResponse] = await Promise.all([
        api.get('/producao/total'),
        api.get('/consumo/eficiencia'),
        api.get('/falhas')
      ]);

      const totalProduction = prodResponse.data.total;
      const energyStats = energyResponse.data;
      const failures = failuresResponse.data;

      const operationalEfficiency = calculateOperationalEfficiency(
        totalProduction,
        energyStats.consumo_real,
        energyStats.consumo_meta,
        failures.pecas_defeituosas,
        failures.producao_total
      );

      setStats({
        energyConsumption: energyStats.consumo_real,
        targetEnergyConsumption: energyStats.consumo_meta,
        defectivePieces: failures.pecas_defeituosas,
        totalProduction: failures.producao_total,
        reworkRate: ((failures.pecas_defeituosas / failures.producao_total) * 100).toFixed(1),
        operationalEfficiency
      });
    } catch (err) {
      setError('Erro ao carregar estatísticas');
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  };

  // Calcular eficiência operacional
  const calculateOperationalEfficiency = (
    actualProduction: number,
    actualEnergy: number,
    targetEnergy: number,
    defectivePieces: number,
    totalProduction: number
  ): number => {
    if (totalProduction === 0 || targetEnergy === 0) return 0;
    
    const productionRatio = actualProduction / totalProduction;
    const energyRatio = targetEnergy / (actualEnergy || 1);
    const qualityRatio = 1 - (defectivePieces / totalProduction);
    
    return Number((productionRatio * energyRatio * qualityRatio * 100).toFixed(1));
  };

  // Formatador de dados para gráficos
  const formatChartData = () => {
    if (timeframe === 'daily') {
      return productionData.slice(-7).map(item => ({
        name: format(new Date(item.data), 'dd/MM'),
        Produção: item.quantidade_total,
        Meta: item.quantidade_total * 1.1 // Exemplo: meta 10% acima
      }));
    }
    // Lógica para weekly/monthly pode ser adicionada aqui
    return [];
  };

  // Efeito para carregar dados iniciais
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchProductionData(),
        fetchInventoryData(),
        fetchStats()
      ]);
    };
    loadData();
  }, []);

  // Atualizar dados periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      fetchProductionData();
      fetchStats();
    }, 300000); // 5 minutos

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Erro</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Recarregar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Factory className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Dashboard de Produção</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Bem-vindo, <span className="font-medium">{user?.name}</span>
            </span>
            {isAdmin() && (
              <Link
                to="/users"
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
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

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            icon={<Power className="h-6 w-6 text-green-500" />}
            title="Consumo Energético"
            value={`${stats.energyConsumption} MWh`}
            loading={loading.stats}
            subtext={`Meta: ${stats.targetEnergyConsumption} MWh`}
          />
          <MetricCard
            icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
            title="Taxa de Retrabalho"
            value={`${stats.reworkRate}%`}
            loading={loading.stats}
            subtext={`${stats.defectivePieces} peças defeituosas`}
          />
          <MetricCard
            icon={<Gauge className="h-6 w-6 text-green-500" />}
            title="Eficiência Operacional"
            value={`${stats.operationalEfficiency}%`}
            loading={loading.stats}
            subtext="Efetividade geral"
          />
        </div>

        {/* Gráfico de Produção */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Produção Recente</h2>
            <div className="flex space-x-2">
              {['daily', 'weekly', 'monthly'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t as any)}
                  className={`px-4 py-2 rounded ${
                    timeframe === t
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t === 'daily' ? 'Diário' : t === 'weekly' ? 'Semanal' : 'Mensal'}
                </button>
              ))}
            </div>
          </div>
          
          {loading.production ? (
            <div className="h-80 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formatChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Produção" 
                    stroke="#16a34a" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Meta" 
                    stroke="#4ade80" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Gráfico de Estoque */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 mb-6">
            <Package className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">Níveis de Estoque</h2>
          </div>
          
          {loading.inventory ? (
            <div className="h-80 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="quantidade" 
                    fill="#16a34a" 
                    name="Estoque Atual" 
                  />
                  <Bar 
                    dataKey="capacidade" 
                    fill="#d1d5db" 
                    name="Capacidade Total" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Botão de Relatório */}
        <div className="mt-6 flex justify-end">
          <PDFDownloadLink
            document={<ProductionReport 
              productionData={productionData} 
              inventoryData={inventoryData} 
              stats={stats} 
            />}
            fileName={`relatorio-producao-${format(new Date(), 'yyyy-MM-dd')}.pdf`}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <FileText className="h-5 w-5" />
            <span>Gerar Relatório PDF</span>
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para cards de métricas
interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtext: string;
  loading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  icon, title, value, subtext, loading = false 
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center space-x-3 mb-4">
      {icon}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    {loading ? (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    ) : (
      <>
        <p className="text-3xl font-bold text-green-500">{value}</p>
        <p className="text-sm text-gray-500 mt-2">{subtext}</p>
      </>
    )}
  </div>
);

export default Dashboard;