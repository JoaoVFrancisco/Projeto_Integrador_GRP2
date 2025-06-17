import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useProductionData = (timeframe: 'daily' | 'monthly' | 'annual') => {
  return useQuery({
    queryKey: ['production', timeframe],
    queryFn: async () => {
      const { data } = await api.get(`/producao?periodo=${timeframe}`);
      return data;
    },
  });
};