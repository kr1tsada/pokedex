/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

/**
 * Load mode types
 */
export type LoadMode = 'pagination' | 'loadAll';

/**
 * Load mode context value type
 */
interface LoadModeContextValue {
  loadMode: LoadMode;
  setLoadMode: (mode: LoadMode) => void;
  toggleLoadMode: () => void;
}

/**
 * Load mode context
 */
const LoadModeContext = createContext<LoadModeContextValue | undefined>(undefined);

/**
 * Load mode provider props
 */
interface LoadModeProviderProps {
  children: ReactNode;
}

/**
 * Load mode provider component
 * จัดการการสลับระหว่าง Pagination และ Load All mode
 */
export const LoadModeProvider = ({ children }: LoadModeProviderProps) => {
  const [loadMode, setLoadMode] = useState<LoadMode>('pagination');

  const toggleLoadMode = useCallback(() => {
    setLoadMode((prev) => (prev === 'pagination' ? 'loadAll' : 'pagination'));
  }, []);

  const value: LoadModeContextValue = {
    loadMode,
    setLoadMode,
    toggleLoadMode,
  };

  return <LoadModeContext.Provider value={value}>{children}</LoadModeContext.Provider>;
};

/**
 * Custom hook สำหรับใช้ LoadModeContext
 * @throws Error ถ้าใช้นอก LoadModeProvider
 */
export const useLoadMode = (): LoadModeContextValue => {
  const context = useContext(LoadModeContext);

  if (context === undefined) {
    throw new Error('useLoadMode must be used within LoadModeProvider');
  }

  return context;
};
