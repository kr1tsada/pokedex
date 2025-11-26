import { type FC, useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { Empty } from 'antd';
import clsx from 'clsx';
import { Loading } from '@/components/common';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { usePokemonList, useDebounce, usePagination } from '@/hooks';
import { useFilter, useView } from '@/contexts';
import { fetchPokemonById } from '@/api/pokemon.api';
import { ITEMS_PER_PAGE, MAX_POKEMON } from '@/utils/constants';
import type { Pokemon } from '@/api/types/pokemon.types';

/**
 * PokemonList Component
 * หน้าที่หลัก:
 * 1. Fetch Pokemon list (names + urls) จาก API
 * 2. Fetch details สำหรับแต่ละ Pokemon (รูป, types, stats)
 * 3. Client-side filtering (search + type filter)
 * 4. Client-side sorting (id/name asc/desc)
 * 5. Render ใน grid หรือ list layout
 */
export const PokemonList: FC = () => {
  const { offset } = usePagination(MAX_POKEMON);
  const { state: filterState } = useFilter();
  const { viewMode } = useView();
  const debouncedSearch = useDebounce(filterState.searchQuery, 300);

  // Fetch Pokemon list (names + urls เท่านั้น)
  const {
    data: listData,
    isLoading: isListLoading,
    error,
  } = usePokemonList(offset, ITEMS_PER_PAGE);

  // Extract Pokemon IDs จาก URLs
  const pokemonIds = useMemo(() => {
    if (!listData?.results) return [];

    return listData.results.map((pokemon) => {
      // URL format: https://pokeapi.co/api/v2/pokemon/25/
      const urlParts = pokemon.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 2] || '0', 10);
      return id;
    });
  }, [listData]);

  // Fetch details สำหรับทุก Pokemon โดยใช้ useQueries
  const detailQueries = useQueries({
    queries: pokemonIds.map((id) => ({
      queryKey: ['pokemon', id],
      queryFn: () => fetchPokemonById(id),
      staleTime: 1000 * 60 * 10, // 10 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      enabled: !!id, // Only fetch ถ้ามี ID
    })),
  });

  // Check loading state
  const isDetailsLoading = detailQueries.some((query) => query.isLoading);

  // Combine results และกรอง undefined
  const pokemonList = useMemo(() => {
    return detailQueries
      .map((query) => query.data)
      .filter((pokemon): pokemon is Pokemon => !!pokemon);
  }, [detailQueries]);

  // Client-side filtering และ sorting
  const filteredPokemon = useMemo(() => {
    let result = [...pokemonList];

    // Search filter (ชื่อ Pokemon)
    if (debouncedSearch) {
      result = result.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Type filter (อย่างน้อย 1 type ตรง)
    if (filterState.selectedTypes.length > 0) {
      result = result.filter((pokemon) =>
        pokemon.types.some((typeInfo) => filterState.selectedTypes.includes(typeInfo.type.name))
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (filterState.sortBy) {
        case 'id-asc':
          return a.id - b.id;
        case 'id-desc':
          return b.id - a.id;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return result;
  }, [pokemonList, debouncedSearch, filterState.selectedTypes, filterState.sortBy]);

  // Loading state
  if (isListLoading || isDetailsLoading) {
    return (
      <div className="py-12">
        <Loading size="large" center />
        <p className="text-center text-gray-500 mt-4">Loading Pokemon...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg font-semibold">Failed to load Pokemon</p>
          <p className="text-sm text-gray-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  // Empty state (ไม่มีผลลัพธ์หลัง filter)
  if (filteredPokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Pokemon found">
          <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filters</p>
        </Empty>
      </div>
    );
  }

  // Render grid or list layout
  return (
    <div
      className={clsx(
        'transition-all duration-200',
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
          : 'flex flex-col gap-3'
      )}
    >
      {filteredPokemon.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} viewMode={viewMode} />
      ))}
    </div>
  );
};
