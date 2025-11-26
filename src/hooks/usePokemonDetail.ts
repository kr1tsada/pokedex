import { useQuery } from '@tanstack/react-query';
import { fetchPokemonById, fetchPokemonByName } from '@/api/pokemon.api';
import type { Pokemon } from '@/api/types/pokemon.types';
import { QUERY_GC_TIMES, QUERY_STALE_TIMES } from '@/lib/queryTimes';

/**
 * Custom hook สำหรับดึงข้อมูล Pokemon แต่ละตัว
 * รองรับทั้ง ID (number) และ name (string)
 *
 * @param idOrName - Pokemon ID หรือ name
 * @returns Query result พร้อม Pokemon data
 */
export const usePokemonDetail = (idOrName: string | number) => {
  return useQuery<Pokemon>({
    queryKey: ['pokemon', idOrName],
    queryFn: async () => {
      // ตรวจสอบว่าเป็น number หรือ string
      const isNumeric = typeof idOrName === 'number' || !isNaN(Number(idOrName));

      if (isNumeric) {
        const id = typeof idOrName === 'number' ? idOrName : Number(idOrName);
        return fetchPokemonById(id);
      } else {
        // เป็น name - convert เป็น lowercase
        const name = String(idOrName).toLowerCase();
        return fetchPokemonByName(name);
      }
    },
    staleTime: QUERY_STALE_TIMES.extended, // 10 minutes
    gcTime: QUERY_GC_TIMES.long, // 1 hour
    retry: (failureCount, error) => {
      // ไม่ retry ถ้าเป็น 404 Not Found
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status === 404) {
          return false;
        }
      }
      // Retry อื่นๆ แค่ 1 ครั้ง
      return failureCount < 1;
    },
    enabled: !!idOrName, // ไม่ fetch ถ้าไม่มี idOrName
  });
};
