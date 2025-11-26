import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { queryClient } from '@/lib/queryClient';
import { router } from './router';
import { FilterProvider, ViewProvider } from '@/contexts';

/**
 * Main App component with providers
 * - QueryClientProvider: TanStack Query for server state
 * - FilterProvider: Client state for search/filter/sort
 * - ViewProvider: Client state for grid/list view mode
 * - RouterProvider: React Router v7 for routing
 *
 * Note: Error handling ใช้ React Router's errorElement แทน ErrorBoundary
 * ดู router.tsx สำหรับ error handling configuration
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <ViewProvider>
          <RouterProvider router={router} />
        </ViewProvider>
      </FilterProvider>
    </QueryClientProvider>
  );
}

export default App;
