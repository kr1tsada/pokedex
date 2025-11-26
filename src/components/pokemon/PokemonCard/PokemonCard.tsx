import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Card } from '@/components/common';
import { formatPokemonId, formatPokemonName, getTypeColor } from '@/utils/formatters';
import type { PokemonType } from '@/api/types/pokemon.types';

/**
 * PokemonCard Props
 * รองรับทั้ง grid และ list view mode
 */
export interface PokemonCardProps {
  pokemon: {
    id: number;
    name: string;
    types: PokemonType[];
    sprites: {
      front_default: string | null;
    };
  };
  viewMode: 'grid' | 'list';
  onClick?: () => void;
}

/**
 * PokemonCard Component
 * แสดง Pokemon card พร้อมรูป, ชื่อ, ID, และ type badges
 * รองรับทั้ง grid mode (vertical) และ list mode (horizontal)
 */
export const PokemonCard: FC<PokemonCardProps> = ({ pokemon, viewMode, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick?.();
    navigate(`/pokemon/${pokemon.id}`);
  };

  // Placeholder image สำหรับกรณีที่ไม่มีรูป
  const imageUrl = pokemon.sprites.front_default || 'https://via.placeholder.com/150?text=No+Image';

  return (
    <Card
      onClick={handleClick}
      hover
      className={clsx(
        'transition-all duration-200',
        viewMode === 'grid'
          ? 'flex flex-col items-center p-4 w-full'
          : 'flex flex-row items-center p-3 gap-4'
      )}
    >
      {/* Pokemon Image */}
      <div
        className={clsx(
          'flex items-center justify-center',
          viewMode === 'grid' ? 'w-32 h-32 mb-3' : 'w-20 h-20 flex-shrink-0'
        )}
      >
        <img
          src={imageUrl}
          alt={pokemon.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Pokemon Info */}
      <div
        className={clsx(
          'flex flex-col',
          viewMode === 'grid' ? 'items-center text-center w-full' : 'flex-1 items-start'
        )}
      >
        {/* Pokemon ID */}
        <div className="text-xs font-semibold text-gray-500 mb-1">
          {formatPokemonId(pokemon.id)}
        </div>

        {/* Pokemon Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{formatPokemonName(pokemon.name)}</h3>

        {/* Type Badges */}
        <div
          className={clsx('flex gap-1.5 flex-wrap', viewMode === 'grid' ? 'justify-center' : '')}
        >
          {pokemon.types.map((typeInfo) => {
            const typeName = typeInfo.type.name;
            const typeColor = getTypeColor(typeName);

            return (
              <span
                key={typeName}
                className="px-3 py-1 rounded-full text-xs font-semibold text-white capitalize"
                style={{ backgroundColor: typeColor }}
              >
                {typeName}
              </span>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
