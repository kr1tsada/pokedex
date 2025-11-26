import { useQuery } from '@tanstack/react-query';
import { fetchAllTypes } from '@/api/pokemon.api';
import type { TypeResponse } from '@/api/types/pokemon.types';
import { QUERY_GC_TIMES, QUERY_STALE_TIMES } from '@/lib/queryTimes';

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
    staleTime: QUERY_STALE_TIMES.infinite, // ไม่ refetch เพราะ types ไม่เปลี่ยน
    gcTime: QUERY_GC_TIMES.infinite, // Cache ตลอด
    retry: 2, // Retry มากกว่าปกติเพราะเป็น static data
  });
};
