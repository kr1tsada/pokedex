import { type FC } from 'react';
import { PokemonListLoadAll } from './PokemonListLoadAll';

/**
 * PokemonListSwitch Component
 *
 * Wrapper component ที่สลับระหว่าง:
 * - Pagination mode (โหลด 20 Pokemon per page)
 * - Load All mode (โหลดทั้งหมด 1010 Pokemon)
 *
 * ใช้สำหรับเปรียบเทียบ performance และ UX
 */
export const PokemonListSwitch: FC = () => <PokemonListLoadAll />;
