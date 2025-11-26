import { type FC } from 'react';
import { Container } from '@/components/layout';
import { PokemonList } from '@/components/pokemon/PokemonList';
import { PokemonFilters } from '@/components/pokemon/PokemonFilters';
import { PokemonViewToggle } from '@/components/pokemon/PokemonViewToggle';
import { Pagination } from '@/components/common';
import { usePagination } from '@/hooks';
import { MAX_POKEMON, ITEMS_PER_PAGE } from '@/utils/constants';

/**
 * Home Page Component
 * หน้าหลักของ Pokedex ประกอบด้วย:
 * - Filters (Search + Type filter + Sort)
 * - View Toggle (Grid/List)
 * - Pokemon List (Grid or List layout)
 * - Pagination
 */
export const Home: FC = () => {
  const { currentPage, totalPages, goToPage } = usePagination(MAX_POKEMON);

  return (
    <Container className="py-8">
      {/* Header Section: Filters & View Toggle */}
      <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        {/* Filters (Search, Type, Sort) */}
        <div className="flex-1">
          <PokemonFilters />
        </div>

        {/* View Toggle (Grid/List) */}
        <div className="flex-shrink-0">
          <PokemonViewToggle />
        </div>
      </div>

      {/* Result Count / Page Info */}
      <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
        <div>
          Page <span className="font-semibold">{currentPage}</span> of{' '}
          <span className="font-semibold">{totalPages}</span>
        </div>
        <div className="text-xs text-gray-500">Showing {ITEMS_PER_PAGE} Pokemon per page</div>
      </div>

      {/* Pokemon List (Main Content) */}
      <div className="mb-8">
        <PokemonList />
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </div>
    </Container>
  );
};
