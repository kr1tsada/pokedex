import { type FC } from 'react';
import { Button } from '@/components/common';
import { GridIcon, ListIcon } from '@/components/icons';
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
    <div className={'flex items-center gap-1 rounded-lg border border-slate-200 bg-white'}>
      {/* Grid View Button */}
      <Button
        onClick={() => setViewMode('grid')}
        variant={viewMode === 'grid' ? 'primary' : 'text'}
        aria-label="Grid view"
        className={cn(
          viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
        )}
        icon={<GridIcon />}
      >
        <span className="hidden sm:inline">Grid</span>
      </Button>

      {/* List View Button */}
      <Button
        onClick={() => setViewMode('list')}
        variant={viewMode === 'list' ? 'primary' : 'text'}
        aria-label="List view"
        className={cn(
          viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
        )}
        icon={<ListIcon />}
      >
        <span className="hidden sm:inline">List</span>
      </Button>
    </div>
  );
};
