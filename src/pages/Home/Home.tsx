import { type FC } from 'react';
import { Container } from '@/components/layout';
import { PokemonListSwitch } from '@/components/pokemon/PokemonList';
import { PokemonFilters } from '@/components/pokemon/PokemonFilters';
import { PokemonViewToggle } from '@/components/pokemon/PokemonViewToggle';

/**
 * Home Page Component
 * หน้าหลักของ Pokedex ประกอบด้วย:
 * - Filters (Search + Type filter + Sort)
 * - View Toggle (Grid/List)
 * - Pokemon List (Grid or List layout)
 * - Pagination
 */
export const Home: FC = () => {
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
          <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 mb-2 block">
            View:
          </label>
          <PokemonViewToggle />
        </div>
      </div>

      {/* Pokemon List (Main Content) */}
      <div className="mb-8">
        <PokemonListSwitch />
      </div>
    </Container>
  );
};
