import { type FC } from 'react';
import type { PokemonType } from '@/api/types/pokemon.types';
import { formatHeight, formatWeight, getTypeColor } from '@/utils/formatters';

interface PokemonInfoProps {
  height: number;
  weight: number;
  baseExperience?: number;
  types: PokemonType[];
}

/**
 * PokemonInfo Component
 * แสดงข้อมูลพื้นฐานของ Pokemon (height, weight, base experience, types)
 */
export const PokemonInfo: FC<PokemonInfoProps> = ({ height, weight, baseExperience, types }) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-800">Information</h3>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Height */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Height</div>
          <div className="text-lg font-semibold text-gray-800">{formatHeight(height)}</div>
        </div>

        {/* Weight */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Weight</div>
          <div className="text-lg font-semibold text-gray-800">{formatWeight(weight)}</div>
        </div>

        {/* Base Experience */}
        {baseExperience !== undefined && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Base Exp</div>
            <div className="text-lg font-semibold text-gray-800">{baseExperience}</div>
          </div>
        )}

        {/* Types */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Type</div>
          <div className="flex gap-2 flex-wrap">
            {types.map((typeInfo) => {
              const typeName = typeInfo.type.name;
              const typeColor = getTypeColor(typeName);

              return (
                <span
                  key={typeName}
                  className="px-3 py-1 text-xs font-semibold text-white rounded-full capitalize"
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
