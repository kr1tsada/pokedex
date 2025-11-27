import { ConfigProvider } from 'antd';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { queryClient } from '@/lib/queryClient';
import { router } from './router';
import { FilterProvider, ViewProvider, LoadModeProvider } from '@/contexts';
import { antdTheme } from '@/lib/antdTheme';

/**
 * Main App component with providers
 * - ConfigProvider: Ant Design theme configuration
 * - QueryClientProvider: TanStack Query for server state
 * - FilterProvider: Client state for search/filter/sort
 * - ViewProvider: Client state for grid/list view mode
 * - LoadModeProvider: Client state for pagination/loadAll mode toggle
 * - RouterProvider: React Router v7 for routing
 *
 * Note: Error handling ใช้ React Router's errorElement แทน ErrorBoundary
 * ดู router.tsx สำหรับ error handling configuration
 */
function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <QueryClientProvider client={queryClient}>
        <FilterProvider>
          <ViewProvider>
            <LoadModeProvider>
              <RouterProvider router={router} />
            </LoadModeProvider>
          </ViewProvider>
        </FilterProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
