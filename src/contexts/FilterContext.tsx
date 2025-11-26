/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useCallback } from 'react';
import type { ReactNode, Dispatch } from 'react';
import type { FilterState, SortOption } from '@/utils/types';

/**
 * Filter actions
 */
type FilterAction =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'TOGGLE_TYPE'; payload: string }
  | { type: 'SET_SELECTED_TYPES'; payload: string[] }
  | { type: 'SET_SORT_BY'; payload: SortOption }
  | { type: 'CLEAR_FILTERS' };

/**
 * Initial filter state
 */
const initialFilterState: FilterState = {
  searchQuery: '',
  selectedTypes: [],
  sortBy: 'id-asc',
};

/**
 * Filter reducer
 */
const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };

    case 'TOGGLE_TYPE': {
      const typeExists = state.selectedTypes.includes(action.payload);
      return {
        ...state,
        selectedTypes: typeExists
          ? state.selectedTypes.filter((t) => t !== action.payload)
          : [...state.selectedTypes, action.payload],
      };
    }

    case 'SET_SELECTED_TYPES':
      return {
        ...state,
        selectedTypes: action.payload,
      };

    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: action.payload,
      };

    case 'CLEAR_FILTERS':
      return initialFilterState;

    default:
      return state;
  }
};

/**
 * Filter context value type
 */
interface FilterContextValue {
  state: FilterState;
  dispatch: Dispatch<FilterAction>;
  setSearchQuery: (query: string) => void;
  toggleType: (type: string) => void;
  setSelectedTypes: (types: string[]) => void;
  setSortBy: (sortOption: SortOption) => void;
  clearFilters: () => void;
}

/**
 * Filter context
 */
const FilterContext = createContext<FilterContextValue | undefined>(undefined);

/**
 * Filter provider props
 */
interface FilterProviderProps {
  children: ReactNode;
}

/**
 * Filter provider component
 * จัดการ state ของ filters ทั้งหมด (search, types, sort)
 */
export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);

  // Memoized action creators
  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }, []);

  const toggleType = useCallback((type: string) => {
    dispatch({ type: 'TOGGLE_TYPE', payload: type });
  }, []);

  const setSelectedTypes = useCallback((types: string[]) => {
    dispatch({ type: 'SET_SELECTED_TYPES', payload: types });
  }, []);

  const setSortBy = useCallback((sortOption: SortOption) => {
    dispatch({ type: 'SET_SORT_BY', payload: sortOption });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTERS' });
  }, []);

  const value: FilterContextValue = {
    state,
    dispatch,
    setSearchQuery,
    toggleType,
    setSelectedTypes,
    setSortBy,
    clearFilters,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

/**
 * Custom hook สำหรับใช้ FilterContext
 * @throws Error ถ้าใช้นอก FilterProvider
 */
export const useFilter = (): FilterContextValue => {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error('useFilter must be used within FilterProvider');
  }

  return context;
};
