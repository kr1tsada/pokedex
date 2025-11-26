/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { ViewMode } from '@/utils/types';

/**
 * localStorage key สำหรับ view mode
 */
const VIEW_MODE_STORAGE_KEY = 'pokedex-view-mode';

/**
 * View context value type
 */
interface ViewContextValue {
  viewMode: ViewMode;
  toggleView: () => void;
  setViewMode: (mode: ViewMode) => void;
}

/**
 * View context
 */
const ViewContext = createContext<ViewContextValue | undefined>(undefined);

/**
 * View provider props
 */
interface ViewProviderProps {
  children: ReactNode;
}

/**
 * Get initial view mode from localStorage
 */
const getInitialViewMode = (): ViewMode => {
  try {
    const stored = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
    if (stored === 'grid' || stored === 'list') {
      return stored;
    }
  } catch (error) {
    // localStorage may not be available (SSR, private browsing)
    console.warn('Failed to read view mode from localStorage:', error);
  }
  return 'grid'; // default
};

/**
 * View provider component
 * จัดการ view mode (grid/list) และ persist ไปยัง localStorage
 */
export const ViewProvider = ({ children }: ViewProviderProps) => {
  const [viewMode, setViewModeState] = useState<ViewMode>(getInitialViewMode);

  // Persist to localStorage when viewMode changes
  useEffect(() => {
    try {
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, viewMode);
    } catch (error) {
      console.warn('Failed to save view mode to localStorage:', error);
    }
  }, [viewMode]);

  const toggleView = useCallback(() => {
    setViewModeState((prev) => (prev === 'grid' ? 'list' : 'grid'));
  }, []);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
  }, []);

  const value: ViewContextValue = {
    viewMode,
    toggleView,
    setViewMode,
  };

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
};

/**
 * Custom hook สำหรับใช้ ViewContext
 * @throws Error ถ้าใช้นอก ViewProvider
 */
export const useView = (): ViewContextValue => {
  const context = useContext(ViewContext);

  if (context === undefined) {
    throw new Error('useView must be used within ViewProvider');
  }

  return context;
};
