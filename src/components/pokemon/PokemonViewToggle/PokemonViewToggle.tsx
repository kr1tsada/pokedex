import { type FC } from 'react';
import { Button } from '@/components/common';
import { useView } from '@/contexts';
import { cn } from '@/utils/style';

/**
 * PokemonViewToggle Component
 * Toggle ระหว่าง Grid view และ List view
 * ใช้ ViewContext เพื่อจัดการ state
 */
export const PokemonViewToggle: FC = () => {
  const { viewMode, setViewMode } = useView();

  return (
    <div className={'flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1'}>
      {/* Grid View Button */}
      <Button
        onClick={() => setViewMode('grid')}
        variant={viewMode === 'grid' ? 'primary' : 'white'}
        aria-label="Grid view"
        className={cn(
          'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
          viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
        )}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
        <span className="ml-2 hidden sm:inline">Grid</span>
      </Button>

      {/* List View Button */}
      <Button
        onClick={() => setViewMode('list')}
        variant={viewMode === 'list' ? 'primary' : 'white'}
        aria-label="List view"
        className={cn(
          'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
          viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
        )}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span className="ml-2 hidden sm:inline">List</span>
      </Button>
    </div>
  );
};
