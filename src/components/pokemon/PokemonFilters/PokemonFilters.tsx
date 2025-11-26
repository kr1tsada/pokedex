import { type FC, useMemo } from 'react';
import { Select } from 'antd';
import { Input, Button } from '@/components/common';
import { useFilter } from '@/contexts';
import { usePokemonTypes } from '@/hooks';
import { formatPokemonName } from '@/utils/formatters';
import type { SortOption } from '@/utils/types';
import { SearchOutlined } from '@ant-design/icons';

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
      {/* Row 1: 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Column 1: Search Input */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Search Pokemon:</label>
          <Input
            value={state.searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name..."
            type="text"
            size="large"
            showClear
            icon={<SearchOutlined />}
          />
        </div>

        {/* Column 2: Type Filter */}
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
            size="large"
            value={state.selectedTypes}
            onChange={handleTypeChange}
            options={typeOptions}
            placeholder="Select types..."
            className="w-full"
            loading={isTypesLoading}
            showSearch
            allowClear
          />
        </div>

        {/* Column 3: Sort Dropdown */}
        <div>
          <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 mb-2 block">
            Sort by:
          </label>
          <Select
            allowClear
            size="large"
            id="sort-select"
            value={state.sortBy}
            onClear={() => handleSortChange('id-asc')}
            onChange={handleSortChange}
            options={sortOptions}
            className="w-full"
          />
        </div>
      </div>

      {/* Row 2: Clear Filters Button */}
      {hasActiveFilters && (
        <div className="flex justify-center">
          <Button onClick={clearFilters} variant="default">
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};
