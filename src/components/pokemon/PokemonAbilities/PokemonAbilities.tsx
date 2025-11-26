import { type FC } from 'react';
import type { PokemonAbility } from '@/api/types/pokemon.types';

interface PokemonAbilitiesProps {
  abilities: PokemonAbility[];
}

/**
 * PokemonAbilities Component
 * แสดงรายการ abilities พร้อม badge "Hidden" สำหรับ hidden ability
 * Sort: normal abilities first, hidden abilities last
 */
export const PokemonAbilities: FC<PokemonAbilitiesProps> = ({ abilities }) => {
  // Sort: normal abilities ก่อน, hidden abilities ทีหลัง
  const sortedAbilities = [...abilities].sort((a, b) => {
    if (a.is_hidden === b.is_hidden) return 0;
    return a.is_hidden ? 1 : -1;
  });

  // Format ability name (capitalize)
  const formatAbilityName = (name: string): string => {
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-800">Abilities</h3>

      {/* Abilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sortedAbilities.map((ability) => {
          const abilityName = formatAbilityName(ability.ability.name);

          return (
            <div
              key={ability.ability.name}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <span className="flex-1 text-sm font-medium text-gray-800">{abilityName}</span>

              {/* Hidden badge */}
              {ability.is_hidden && (
                <span className="px-2 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full">
                  Hidden
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
