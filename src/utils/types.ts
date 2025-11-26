/**
 * Application-level type definitions
 */

export type ViewMode = 'grid' | 'list';

export type SortOption = 'id-asc' | 'id-desc' | 'name-asc' | 'name-desc';

export interface FilterState {
  searchQuery: string;
  selectedTypes: string[];
  sortBy: SortOption;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
