// src/components/ProductionReport.tsx
import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet,
  Image,
  Font
} from '@react-pdf/renderer';
import { format } from 'date-fns';

// Registrar fontes (opcional)
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf' }, // normal
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf', fontWeight: 'bold' }
  ]
});

// Estilos
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#16a34a',
    paddingBottom: 10
  },
  logo: {
    width: 120,
    height: 40,
    objectFit: 'contain'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16a34a',
    textAlign: 'center',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    backgroundColor: '#f3f4f6',
    padding: 5
  },
  table: {
    width: '100%',
    marginBottom: 15
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 5
  },
  tableHeader: {
    backgroundColor: '#16a34a',
    color: 'white',
    fontWeight: 'bold'
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    flex: 1,
    textAlign: 'center'
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  statItem: {
    width: '30%',
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 5
  },
  statTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#374151'
  },
  statValue: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#9ca3af',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 5
  }
});

interface ProductionReportProps {
  productionData: Array<{
    data: string;
    quantidade_total: number;
    quantidade_usavel: number;
    consumo_energetico: number;
  }>;
  inventoryData: Array<{
    nome: string;
    quantidade: number;
    capacidade?: number;
  }>;
  stats: {
    energyConsumption: number;
    targetEnergyConsumption: number;
    defectivePieces: number;
    totalProduction: number;
    reworkRate: string;
    operationalEfficiency: number;
  };
}

const ProductionReport: React.FC<ProductionReportProps> = ({ 
  productionData, 
  inventoryData, 
  stats 
}) => {
  // Formatar dados para a tabela
  const formattedProductionData = productionData
    .slice(0, 10) // Limitar a 10 registros
    .map(item => ({
      ...item,
      data: format(new Date(item.data), 'dd/MM/yyyy'),
      utilizacao: `${((item.quantidade_usavel / item.quantidade_total) * 100).toFixed(1)}%`
    }));

  const formattedInventoryData = inventoryData.map(item => ({
    ...item,
    capacidade: item.capacidade || 100,
    percentual: `${((item.quantidade / (item.capacidade || 100)) * 100).toFixed(1)}%`
  }));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image 
            src="/logo.png" // Substitua pelo caminho do seu logo
            style={styles.logo} 
          />
          <View>
            <Text style={styles.title}>Relatório de Produção</Text>
            <Text style={styles.subtitle}>
              Gerado em {format(new Date(), 'dd/MM/yyyy HH:mm')}
            </Text>
          </View>
        </View>

        {/* Seção: Estatísticas Principais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Indicadores Chave</Text>
          <View style={styles.statContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statTitle}>Consumo Energético</Text>
              <Text style={styles.statValue}>
                {stats.energyConsumption} MWh
              </Text>
              <Text style={{ fontSize: 8 }}>
                Meta: {stats.targetEnergyConsumption} MWh
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statTitle}>Taxa de Retrabalho</Text>
              <Text style={{ ...styles.statValue, color: '#ef4444' }}>
                {stats.reworkRate}%
              </Text>
              <Text style={{ fontSize: 8 }}>
                {stats.defectivePieces} peças defeituosas
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statTitle}>Eficiência Operacional</Text>
              <Text style={styles.statValue}>
                {stats.operationalEfficiency}%
              </Text>
            </View>
          </View>
        </View>

        {/* Seção: Dados de Produção */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Últimos Registros de Produção</Text>
          <View style={styles.table}>
            {/* Cabeçalho da tabela */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Data</Text>
              <Text style={styles.tableCell}>Total Produzido</Text>
              <Text style={styles.tableCell}>Quantidade Útil</Text>
              <Text style={styles.tableCell}>Utilização</Text>
              <Text style={styles.tableCell}>Consumo (kWh)</Text>
            </View>
            {/* Dados da tabela */}
            {formattedProductionData.map((row, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{row.data}</Text>
                <Text style={styles.tableCell}>{row.quantidade_total}</Text>
                <Text style={styles.tableCell}>{row.quantidade_usavel}</Text>
                <Text style={styles.tableCell}>{row.utilizacao}</Text>
                <Text style={styles.tableCell}>{row.consumo_energetico}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Seção: Níveis de Estoque */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Situação do Estoque</Text>
          <View style={styles.table}>
            {/* Cabeçalho da tabela */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Item</Text>
              <Text style={styles.tableCell}>Quantidade</Text>
              <Text style={styles.tableCell}>Capacidade</Text>
              <Text style={styles.tableCell}>Percentual</Text>
            </View>
            {/* Dados da tabela */}
            {formattedInventoryData.map((row, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{row.nome}</Text>
                <Text style={styles.tableCell}>{row.quantidade}</Text>
                <Text style={styles.tableCell}>{row.capacidade}</Text>
                <Text style={{
                  ...styles.tableCell,
                  color: row.quantidade / row.capacidade < 0.2 ? '#ef4444' : 
                        row.quantidade / row.capacidade > 0.8 ? '#f59e0b' : '#16a34a'
                }}>
                  {row.percentual}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Rodapé */}
        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          <>
            Lopes Solutions - Sistema de Gestão de Produção
            {'\n'}
            Página {pageNumber} de {totalPages}
          </>
        )} fixed />
      </Page>
    </Document>
  );
};

export default ProductionReport;