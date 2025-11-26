import { TYPE_COLORS, type PokemonTypeName } from './constants';

/**
 * Format Pokemon ID เป็น string พร้อม leading zeros
 * @example formatPokemonId(1) => "#001"
 * @example formatPokemonId(25) => "#025"
 */
export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

/**
 * Capitalize Pokemon name
 * @example formatPokemonName("pikachu") => "Pikachu"
 * @example formatPokemonName("mr-mime") => "Mr-Mime"
 */
export const formatPokemonName = (name: string): string => {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-');
};

/**
 * Convert height from decimetres to meters
 * @example formatHeight(7) => "0.7 m"
 */
export const formatHeight = (height: number): string => {
  const meters = height / 10;
  return `${meters.toFixed(1)} m`;
};

/**
 * Convert weight from hectograms to kilograms
 * @example formatWeight(69) => "6.9 kg"
 */
export const formatWeight = (weight: number): string => {
  const kg = weight / 10;
  return `${kg.toFixed(1)} kg`;
};

/**
 * Get type color from constants
 */
export const getTypeColor = (type: string): string => {
  const normalizedType = type.toLowerCase() as PokemonTypeName;
  return TYPE_COLORS[normalizedType] || TYPE_COLORS.normal;
};

/**
 * Format stat name
 * @example formatStatName("hp") => "HP"
 * @example formatStatName("special-attack") => "Sp. Atk"
 */
export const formatStatName = (stat: string): string => {
  const statMap: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };
  return statMap[stat] || stat;
};
