import { type FC, useState, useEffect } from 'react';
import type { PokemonStat } from '@/api/types/pokemon.types';
import { formatStatName } from '@/utils/formatters';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

/**
 * PokemonStats Component
 * แสดง stat bars สำหรับ 6 Pokemon stats (HP, Attack, Defense, Sp.Atk, Sp.Def, Speed)
 * พร้อม progress bars แบบ horizontal และ total base stats
 * Bars animate from 0% to actual value on mount
 */
export const PokemonStats: FC<PokemonStatsProps> = ({ stats }) => {
  // คำนวณ total base stats
  const totalStats = stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  // Animation state - เริ่มจาก false แล้วเปลี่ยนเป็น true เพื่อ trigger animation
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Delay เล็กน้อยเพื่อให้ DOM render ก่อน แล้วค่อย animate
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Map stat name ไปหาสีที่เหมาะสม
  const getStatColor = (statName: string): string => {
    const name = statName.toLowerCase();
    if (name.includes('hp')) return 'bg-red-500';
    if (name.includes('attack') && !name.includes('special')) return 'bg-orange-500';
    if (name.includes('defense') && !name.includes('special')) return 'bg-yellow-500';
    if (name.includes('special-attack')) return 'bg-blue-500';
    if (name.includes('special-defense')) return 'bg-green-500';
    if (name.includes('speed')) return 'bg-pink-500';
    return 'bg-gray-500'; // fallback
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Base Stats</h3>
        <div className="text-sm text-gray-600">
          Total: <span className="font-bold text-gray-800">{totalStats}</span>
        </div>
      </div>

      {/* Stat Bars */}
      <div className="space-y-3">
        {stats.map((stat) => {
          // คำนวณ percentage (255 = max possible stat)
          const percentage = Math.round((stat.base_stat / 255) * 100);
          const statColor = getStatColor(stat.stat.name);
          const formattedName = formatStatName(stat.stat.name);

          return (
            <div key={stat.stat.name} className="space-y-1">
              {/* Stat name และค่า */}
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700 w-20">{formattedName}</span>
                <span className="font-semibold text-gray-800">{stat.base_stat}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out motion-reduce:transition-none ${statColor}`}
                  style={{ width: isAnimated ? `${percentage}%` : '0%' }}
                  role="progressbar"
                  aria-valuenow={stat.base_stat}
                  aria-valuemin={0}
                  aria-valuemax={255}
                  aria-label={`${formattedName} stat`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
