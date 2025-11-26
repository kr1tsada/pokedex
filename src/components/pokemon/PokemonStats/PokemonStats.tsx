import { type FC, useState, useEffect } from 'react';
import { Progress } from 'antd';
import type { PokemonStat } from '@/api/types/pokemon.types';
import { formatStatName } from '@/utils/formatters';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

/**
 * PokemonStats Component
 * แสดง stat bars สำหรับ 6 Pokemon stats (HP, Attack, Defense, Sp.Atk, Sp.Def, Speed)
 * พร้อม Ant Design Progress bars และ total base stats
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

  // Map stat name ไปหาสี hex สำหรับ strokeColor
  const getStatColor = (statName: string): string => {
    const name = statName.toLowerCase();
    if (name.includes('hp')) return '#ef4444'; // red-500
    if (name.includes('attack') && !name.includes('special')) return '#f97316'; // orange-500
    if (name.includes('defense') && !name.includes('special')) return '#eab308'; // yellow-500
    if (name.includes('special-attack')) return '#3b82f6'; // blue-500
    if (name.includes('special-defense')) return '#22c55e'; // green-500
    if (name.includes('speed')) return '#ec4899'; // pink-500
    return '#6b7280'; // gray-500 fallback
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

              {/* Ant Design Progress Bar */}
              <Progress
                percent={isAnimated ? percentage : 0}
                strokeColor={statColor}
                showInfo={false}
                strokeLinecap="round"
                trailColor="#e5e7eb"
                size="small"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
