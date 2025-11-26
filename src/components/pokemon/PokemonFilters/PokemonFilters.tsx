import { type FC, useMemo } from 'react';
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
 * - Type filter dropdown (เลือก type แบบ multi-select)
 * - Sort dropdown (เรียงตาม ID หรือ Name)
 * - Clear filters button
 */
export const PokemonFilters: FC = () => {
  const { state, setSearchQuery, setSelectedTypes, setSortBy, clearFilters } = useFilter();
  const { data: typesData, isLoading: isTypesLoading } = usePokemonTypes();

  // Transform API data เป็น Select options format
  const typeOptions = useMemo(
    () =>
      typesData?.results.map((type) => ({
        label: formatPokemonName(type.name),
        value: type.name,
      })) || [],
    [typesData]
  );

  const handleTypeChange = (selectedValues: string[]) => {
    setSelectedTypes(selectedValues);
  };

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
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Filter by Type:
          {state.selectedTypes.length > 0 && (
            <span className="text-xs text-gray-500 ml-2">
              {state.selectedTypes.length} selected
            </span>
          )}
        </label>

        <Select
          mode="multiple"
          value={state.selectedTypes}
          onChange={handleTypeChange}
          options={typeOptions}
          placeholder="Select Pokemon types..."
          className="w-full"
          loading={isTypesLoading}
          showSearch
          allowClear
        />
      </div>

      {/* Sort Dropdown & Clear Button */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Sort Dropdown */}
        <div className="flex-1 w-full sm:w-auto">
          <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 mb-1 block">
            Sort by:
          </label>
          <Select
            allowClear
            id="sort-select"
            value={state.sortBy}
            onClear={() => handleSortChange('id-asc')}
            onChange={handleSortChange}
            options={sortOptions}
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
