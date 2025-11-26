import { useQuery } from '@tanstack/react-query';
import { fetchAllTypes } from '@/api/pokemon.api';
import type { TypeResponse } from '@/api/types/pokemon.types';

/**
 * Custom hook สำหรับดึง Pokemon types ทั้งหมด
 * Cache ตลอดเพราะ types ไม่เปลี่ยน (staleTime: Infinity)
 *
 * @returns Query result พร้อม types data
 */
export const usePokemonTypes = () => {
  return useQuery<TypeResponse>({
    queryKey: ['pokemon-types'],
    queryFn: fetchAllTypes,
    staleTime: Infinity, // ไม่ refetch เพราะ types ไม่เปลี่ยน
    gcTime: Infinity, // Cache ตลอด
    retry: 2, // Retry มากกว่าปกติเพราะเป็น static data
  });
};
