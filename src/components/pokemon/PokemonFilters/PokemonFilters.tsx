import { type FC } from 'react';
import { Input, Button } from '@/components/common';
import { useFilter } from '@/contexts';
import { usePokemonTypes } from '@/hooks';
import { formatPokemonName } from '@/utils/formatters';
import type { SortOption } from '@/utils/types';

/**
 * PokemonFilters Component
 * ประกอบด้วย:
 * - Search input (ค้นหาชื่อ Pokemon)
 * - Type filter chips (เลือก type แบบ multi-select)
 * - Sort dropdown (เรียงตาม ID หรือ Name)
 * - Clear filters button
 */
export const PokemonFilters: FC = () => {
  const { state, setSearchQuery, toggleType, setSortBy, clearFilters } = useFilter();
  const { data: typesData, isLoading: isTypesLoading } = usePokemonTypes();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };

  const hasActiveFilters =
    state.searchQuery.length > 0 || state.selectedTypes.length > 0 || state.sortBy !== 'id-asc';

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div>
        <Input
          value={state.searchQuery}
          onChange={setSearchQuery}
          placeholder="Search Pokemon by name..."
          type="text"
          showClear
          icon={
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
        />
      </div>

      {/* Type Filters */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Filter by Type:</label>
          {state.selectedTypes.length > 0 && (
            <span className="text-xs text-gray-500">{state.selectedTypes.length} selected</span>
          )}
        </div>

        {isTypesLoading ? (
          <div className="text-sm text-gray-500">Loading types...</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {typesData?.results.map((type: { name: string; url: string }) => {
              const isSelected = state.selectedTypes.includes(type.name);

              return (
                <Button
                  key={type.name}
                  onClick={() => toggleType(type.name)}
                  variant={isSelected ? 'primary' : 'outline'}
                  className="text-xs capitalize"
                >
                  {formatPokemonName(type.name)}
                </Button>
              );
            })}
          </div>
        )}
      </div>

      {/* Sort Dropdown & Clear Button */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Sort Dropdown */}
        <div className="flex-1 w-full sm:w-auto">
          <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 mb-1 block">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={state.sortBy}
            onChange={handleSortChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
          >
            <option value="id-asc">ID (Ascending)</option>
            <option value="id-desc">ID (Descending)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button onClick={clearFilters} variant="secondary" className="mt-6 sm:mt-0">
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};
