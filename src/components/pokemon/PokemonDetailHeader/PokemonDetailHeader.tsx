import { type FC } from 'react';
import type { Pokemon } from '@/api/types/pokemon.types';
import { formatPokemonId, formatPokemonName, getTypeColor } from '@/utils/formatters';

interface PokemonDetailHeaderProps {
  pokemon: Pokemon;
}

/**
 * PokemonDetailHeader Component
 * Hero section แสดงรูปใหญ่ + ชื่อ + ID + Type badges
 */
export const PokemonDetailHeader: FC<PokemonDetailHeaderProps> = ({ pokemon }) => {
  // ใช้ official artwork ถ้ามี, ไม่งั้นใช้ front_default
  const imageUrl =
    pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;

  // สี background gradient ตาม primary type
  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const primaryColor = getTypeColor(primaryType);

  return (
    <div
      className="relative rounded-xl p-8 mb-8 overflow-hidden animate-fade-in"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}15 0%, ${primaryColor}30 100%)`,
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="relative flex flex-col md:flex-row items-center gap-8">
        {/* Pokemon Image */}
        <div className="flex-shrink-0 animate-scale-in">
          <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-2xl border-4 border-white shadow-xl">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={pokemon.name}
                className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-lg"
              />
            ) : (
              <div className="text-gray-400 text-sm">No image</div>
            )}
          </div>
        </div>

        {/* Pokemon Info */}
        <div className="flex-1 text-center md:text-left space-y-4 animate-slide-up">
          {/* ID */}
          <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            {formatPokemonId(pokemon.id)}
          </div>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 capitalize">
            {formatPokemonName(pokemon.name)}
          </h1>

          {/* Type Badges */}
          <div className="flex gap-2 justify-center md:justify-start flex-wrap">
            {pokemon.types.map((typeInfo) => {
              const typeName = typeInfo.type.name;
              const typeColor = getTypeColor(typeName);

              return (
                <span
                  key={typeName}
                  className="px-4 py-2 text-sm font-semibold text-white rounded-full capitalize shadow-md hover:scale-105 transition-transform"
                  style={{ backgroundColor: typeColor }}
                >
                  {typeName}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
