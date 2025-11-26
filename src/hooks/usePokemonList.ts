import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '@/api/pokemon.api';
import type { PokemonListResponse } from '@/api/types/pokemon.types';

/**
 * Custom hook สำหรับดึงรายการ Pokemon
 * ใช้ TanStack Query v5 สำหรับ caching และ state management
 *
 * @param offset - เริ่มต้นที่ตำแหน่งไหน (default: 0)
 * @param limit - จำนวน Pokemon ที่ต้องการ (default: 20)
 * @returns Query result พร้อม data, loading, error states
 */
export const usePokemonList = (offset: number = 0, limit: number = 20) => {
  return useQuery<PokemonListResponse>({
    queryKey: ['pokemon-list', offset, limit],
    queryFn: () => fetchPokemonList(offset, limit),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (v5: NOT cacheTime)
    retry: 1,
  });
};
