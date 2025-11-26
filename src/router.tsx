import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { ErrorPage } from '@/pages/ErrorPage';
import { Home } from '@/pages/Home';
import { PokemonDetailPage } from '@/pages/PokemonDetailPage';

/**
 * React Router v7 configuration
 * Uses createBrowserRouter with errorElement for built-in error handling
 */

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <ErrorPage />, // Error boundary for root route
  },
  {
    path: '/pokemon/:idOrName',
    element: (
      <Layout>
        <PokemonDetailPage />
      </Layout>
    ),
    errorElement: <ErrorPage />, // Error boundary for detail page
  },
  {
    path: '*',
    element: <ErrorPage />, // 404 handler
  },
]);
