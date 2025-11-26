import { type FC } from 'react';
import { Select } from 'antd';
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

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
  };

  const sortOptions = [
    { label: 'ID (Ascending)', value: 'id-asc' },
    { label: 'ID (Descending)', value: 'id-desc' },
    { label: 'Name (A-Z)', value: 'name-asc' },
    { label: 'Name (Z-A)', value: 'name-desc' },
  ];

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
                  variant={isSelected ? 'primary' : 'dashed'}
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
          <Select
            id="sort-select"
            value={state.sortBy}
            onChange={handleSortChange}
            options={sortOptions}
            className="w-full"
            style={{ width: '100%' }}
          />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button onClick={clearFilters} variant="default" className="mt-6 sm:mt-0">
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};
