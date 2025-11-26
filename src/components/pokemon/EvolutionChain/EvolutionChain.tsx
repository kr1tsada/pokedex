import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvolutionChain, type EvolutionStage } from '@/hooks';
import { Loading } from '@/components/common';
import { formatPokemonName } from '@/utils/formatters';

interface EvolutionChainProps {
  speciesUrl: string; // จาก pokemon.species.url
}

/**
 * EvolutionChain Component
 * แสดง evolution chain แบบ visual flow พร้อม sprites และลูกศร
 * Handle edge cases: no evolution, branching evolution, 3-stage evolution
 */
export const EvolutionChain: FC<EvolutionChainProps> = ({ speciesUrl }) => {
  const navigate = useNavigate();
  const { data: evolutionPaths, isLoading, error } = useEvolutionChain(speciesUrl);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loading size="sm" />
      </div>
    );
  }

  // Error state
  if (error || !evolutionPaths || evolutionPaths.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">Unable to load evolution chain</p>
      </div>
    );
  }

  // ใช้ path แรก (สำหรับ simple cases และ branching จะแสดง path หลักก่อน)
  const primaryPath = evolutionPaths[0];

  if (!primaryPath) {
    return null;
  }

  // No evolution case (เช่น Ditto, Pinsir) - path มีแค่ตัวเดียว
  if (primaryPath.length === 1) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Evolution Chain</h3>
        <div className="flex items-center justify-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Does not evolve</p>
        </div>
      </div>
    );
  }

  // Handle click - navigate to Pokemon detail page
  const handlePokemonClick = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Evolution Chain</h3>

      {/* Evolution stages - horizontal flow */}
      <div className="flex items-center justify-center gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200 overflow-x-auto">
        {primaryPath.map((stage: EvolutionStage, index: number) => (
          <div key={`${stage.name}-${index}`} className="flex items-center gap-4">
            {/* Pokemon stage */}
            <div
              className="flex flex-col items-center gap-2 cursor-pointer group"
              onClick={() => handlePokemonClick(stage.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handlePokemonClick(stage.name);
                }
              }}
            >
              {/* Sprite with hover effect */}
              <div className="w-24 h-24 flex items-center justify-center bg-white rounded-lg border-2 border-gray-200 group-hover:border-blue-400 group-hover:shadow-lg transition-all duration-200 group-hover:scale-110">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${stage.id}.png`}
                  alt={stage.name}
                  className="w-20 h-20 object-contain"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to front_default ถ้า official artwork ไม่มี
                    const target = e.target as HTMLImageElement;
                    target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`; // placeholder
                  }}
                />
              </div>

              {/* Pokemon name */}
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors capitalize">
                {formatPokemonName(stage.name)}
              </span>

              {/* Evolution requirement (level/trigger) */}
              {stage.minLevel && (
                <span className="text-xs text-gray-500">Lv. {stage.minLevel}</span>
              )}
            </div>

            {/* Arrow (ไม่แสดงหลัง Pokemon ตัวสุดท้าย) */}
            {index < primaryPath.length - 1 && (
              <div className="flex items-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Note: Branching evolution (Eevee) */}
      {evolutionPaths.length > 1 && (
        <p className="text-xs text-gray-500 text-center">
          This Pokemon has {evolutionPaths.length} evolution paths. Showing primary evolution.
        </p>
      )}
    </div>
  );
};
