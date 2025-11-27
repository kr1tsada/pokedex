/* eslint-disable react-hooks/purity */
import { type FC, useEffect, useMemo, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { Empty, Progress } from 'antd';
import clsx from 'clsx';
import { Loading, Pagination } from '@/components/common';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { useDebounce } from '@/hooks';
import { useFilter, useView } from '@/contexts';
import { fetchPokemonById } from '@/api/pokemon.api';
import { MAX_POKEMON, ITEMS_PER_PAGE } from '@/utils/constants';
import type { Pokemon } from '@/api/types/pokemon.types';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { QUERY_GC_TIMES, QUERY_STALE_TIMES } from '@/lib/queryTimes';

/**
 * PokemonListLoadAll Component - Load All Version with Client-Side Pagination
 *
 * หน้าที่หลัก:
 * 1. Fetch ALL Pokemon (1-1010) พร้อมกันด้วย parallel requests
 * 2. Client-side filtering จากข้อมูลทั้งหมด (ไม่จำกัดแค่หน้าปัจจุบัน)
 * 3. Client-side sorting
 * 4. Client-side pagination (แสดงทีละ 20 ตัวต่อหน้า)
 *
 * ข้อเสีย:
 * - Initial load ช้ากว่า (~3-5 วินาที)
 * - Memory usage สูง (~10MB) แต่ render น้อยลง
 */
export const PokemonListLoadAll: FC = () => {
  const { state: filterState } = useFilter();
  const { viewMode } = useView();
  const debouncedSearch = useDebounce(filterState.searchQuery, 300);

  // Performance metrics
  const [loadStartTime] = useState(Date.now());
  const [loadEndTime, setLoadEndTime] = useState<number | null>(null);

  const filterSignature = useMemo(
    () =>
      [
        debouncedSearch.toLowerCase(),
        [...filterState.selectedTypes].sort().join(','),
        filterState.sortBy,
      ].join('|'),
    [debouncedSearch, filterState.selectedTypes, filterState.sortBy]
  );

  // Client-side pagination state keyed by current filters
  const [paginationState, setPaginationState] = useState(() => ({
    signature: filterSignature,
    page: 1,
  }));

  const currentPage = paginationState.signature === filterSignature ? paginationState.page : 1;

  // Generate array of ALL Pokemon IDs (1-1010)
  const allPokemonIds = useMemo(() => {
    return Array.from({ length: MAX_POKEMON }, (_, i) => i + 1);
  }, []);

  // Fetch ALL Pokemon details โดยใช้ useQueries (parallel)
  const detailQueries = useQueries({
    queries: allPokemonIds.map((id) => ({
      queryKey: ['pokemon', id],
      queryFn: () => fetchPokemonById(id),
      staleTime: QUERY_STALE_TIMES.extended, // 10 minutes
      gcTime: QUERY_GC_TIMES.long, // 1 hour
    })),
  });

  // Check loading state และ progress
  const loadingCount = detailQueries.filter((query) => query.isLoading).length;
  const successCount = detailQueries.filter((query) => query.isSuccess).length;
  const errorCount = detailQueries.filter((query) => query.isError).length;
  const isLoading = loadingCount > 0;
  const loadProgress = Math.round((successCount / MAX_POKEMON) * 100);

  // Track load completion
  useEffect(() => {
    if (!isLoading && loadEndTime === null) {
      const endTime = Date.now();
      setLoadEndTime(endTime);
    }
  }, [isLoading, loadEndTime, loadStartTime]);

  // Combine results และกรอง undefined
  const allPokemon = useMemo(() => {
    return detailQueries
      .map((query) => query.data)
      .filter((pokemon): pokemon is Pokemon => !!pokemon);
  }, [detailQueries]);

  // Client-side filtering และ sorting (จากข้อมูลทั้งหมด!)
  const filteredPokemon = useMemo(() => {
    let result = [...allPokemon];

    // Search filter (ชื่อ Pokemon)
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter((pokemon) => {
        const nameMatch = pokemon.name.toLowerCase().includes(searchLower);
        const idMatch = pokemon.id.toString().includes(debouncedSearch);
        return nameMatch || idMatch;
      });
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
  }, [allPokemon, debouncedSearch, filterState.selectedTypes, filterState.sortBy]);

  // Client-side pagination (แสดงเฉพาะหน้าปัจจุบัน)
  const paginatedPokemon = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredPokemon.slice(startIndex, endIndex);
  }, [filteredPokemon, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);

  // Handle page change with scroll to top
  const handlePageChange = (page: number) => {
    setPaginationState({ signature: filterSignature, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state with progress
  if (isLoading) {
    return (
      <div className="py-12">
        <Loading size="large" center />
        <p className="text-center text-gray-500 mt-4">
          Loading ALL Pokemon... ({successCount}/{MAX_POKEMON})
        </p>
        <div className="max-w-md mx-auto mt-4">
          <Progress
            percent={loadProgress}
            status="active"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">
          Elapsed: {((Date.now() - loadStartTime) / 1000).toFixed(1)}s
        </p>
      </div>
    );
  }

  // Error state
  if (errorCount > 0) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <ExclamationCircleOutlined className="text-2xl" />
          <p className="text-lg font-semibold">Some Pokemon failed to load</p>
          <p className="text-sm text-gray-600 mt-2">
            Loaded: {successCount}, Failed: {errorCount}
          </p>
        </div>
      </div>
    );
  }

  // Empty state (ไม่มีผลลัพธ์หลัง filter)
  if (filteredPokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Pokemon found">
          <p className="text-sm text-gray-400 mt-2">
            Searched all {successCount} Pokemon - try different filters
          </p>
        </Empty>
      </div>
    );
  }

  // Render grid or list layout with pagination
  return (
    <>
      <div
        className={clsx(
          'transition-all duration-200',
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
            : 'flex flex-col gap-3'
        )}
      >
        {paginatedPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} viewMode={viewMode} />
        ))}
      </div>

      {/* Client-side pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};
