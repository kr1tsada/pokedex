import { useQuery } from '@tanstack/react-query';
import { fetchEvolutionChain, fetchPokemonSpecies } from '@/api/pokemon.api';
import type { EvolutionChain, ChainLink } from '@/api/types/pokemon.types';
import { QUERY_GC_TIMES, QUERY_STALE_TIMES } from '@/lib/queryTimes';

/**
 * Simplified evolution stage
 */
export interface EvolutionStage {
  id: number;
  name: string;
  minLevel?: number;
  trigger?: string;
}

/**
 * Parse evolution chain แบบ recursive
 * แปลง nested structure ให้เป็น flat array ของ evolution stages
 */
const parseEvolutionChain = (chain: ChainLink): EvolutionStage[][] => {
  const stages: EvolutionStage[][] = [];

  const traverse = (link: ChainLink, currentPath: EvolutionStage[] = []) => {
    // Extract Pokemon ID จาก species URL
    // URL format: https://pokeapi.co/api/v2/pokemon-species/{id}/
    const pokemonId = Number(link.species.url.split('/').filter(Boolean).pop());

    // เพิ่ม current Pokemon ลง path
    const currentStage: EvolutionStage = {
      id: pokemonId,
      name: link.species.name,
    };

    // ถ้ามี evolution details ให้เพิ่มข้อมูล
    if (link.evolution_details.length > 0) {
      const detail = link.evolution_details[0];
      if (detail) {
        if (detail.min_level) {
          currentStage.minLevel = detail.min_level;
        }
        if (detail.trigger) {
          currentStage.trigger = detail.trigger.name;
        }
      }
    }

    const newPath = [...currentPath, currentStage];

    // ถ้าไม่มี evolution ต่อ ให้บันทึก path นี้
    if (link.evolves_to.length === 0) {
      stages.push(newPath);
      return;
    }

    // Recursive สำหรับแต่ละ branch
    link.evolves_to.forEach((evolution) => {
      traverse(evolution, newPath);
    });
  };

  traverse(chain);
  return stages;
};

/**
 * Custom hook สำหรับดึงและ parse evolution chain
 *
 * @param speciesUrl - URL ของ pokemon species จาก pokemon.species.url
 * @returns Query result พร้อม parsed evolution stages
 */
export const useEvolutionChain = (speciesUrl?: string) => {
  // Extract species ID จาก URL (e.g., https://pokeapi.co/api/v2/pokemon-species/2/ -> 2)
  const speciesId = speciesUrl ? Number(speciesUrl.split('/').filter(Boolean).pop()) : undefined;

  // First query: fetch species data เพื่อดึง evolution_chain.url
  const speciesQuery = useQuery({
    queryKey: ['pokemon-species', speciesId],
    queryFn: async () => {
      if (!speciesId) {
        throw new Error('Species ID is required');
      }
      return await fetchPokemonSpecies(speciesId);
    },
    enabled: !!speciesId,
    staleTime: QUERY_STALE_TIMES.infinite, // Species data ไม่เปลี่ยน
    gcTime: QUERY_GC_TIMES.long, // 1 hour
  });

  // Extract evolution chain ID จาก species.evolution_chain.url
  const evolutionChainId = speciesQuery.data?.evolution_chain.url
    ? Number(speciesQuery.data.evolution_chain.url.split('/').filter(Boolean).pop())
    : undefined;

  // Second query: fetch evolution chain (dependent query - รอ speciesQuery สำเร็จก่อน)
  const evolutionQuery = useQuery<EvolutionStage[][]>({
    queryKey: ['evolution-chain', evolutionChainId],
    queryFn: async () => {
      if (!evolutionChainId) {
        throw new Error('Evolution chain ID is required');
      }

      const data: EvolutionChain = await fetchEvolutionChain(evolutionChainId);
      return parseEvolutionChain(data.chain);
    },
    staleTime: QUERY_STALE_TIMES.infinite, // Evolution chain ไม่เปลี่ยน
    gcTime: QUERY_GC_TIMES.long, // 1 hour
    enabled: !!evolutionChainId, // รอให้มี evolutionChainId จาก speciesQuery ก่อน
  });

  // Return evolution query result with combined loading/error states
  return {
    data: evolutionQuery.data,
    isLoading: speciesQuery.isLoading || evolutionQuery.isLoading,
    error: speciesQuery.error || evolutionQuery.error,
  };
};
