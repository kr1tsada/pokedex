import { apiClient } from './client';
import type {
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
  EvolutionChain,
  TypeResponse,
} from './types/pokemon.types';

/**
 * Fetch Pokemon list with pagination
 */
export const fetchPokemonList = async (
  offset: number = 0,
  limit: number = 20
): Promise<PokemonListResponse> => {
  const response = await apiClient.get<PokemonListResponse>('/pokemon', {
    params: { offset, limit },
  });
  return response.data;
};

/**
 * Fetch Pokemon by ID
 */
export const fetchPokemonById = async (id: number): Promise<Pokemon> => {
  const response = await apiClient.get<Pokemon>(`/pokemon/${id}`);
  return response.data;
};

/**
 * Fetch Pokemon by name
 */
export const fetchPokemonByName = async (name: string): Promise<Pokemon> => {
  const response = await apiClient.get<Pokemon>(`/pokemon/${name.toLowerCase()}`);
  return response.data;
};

/**
 * Fetch Pokemon species data
 */
export const fetchPokemonSpecies = async (id: number): Promise<PokemonSpecies> => {
  const response = await apiClient.get<PokemonSpecies>(`/pokemon-species/${id}`);
  return response.data;
};

/**
 * Fetch evolution chain by ID
 */
export const fetchEvolutionChain = async (id: number): Promise<EvolutionChain> => {
  const response = await apiClient.get<EvolutionChain>(`/evolution-chain/${id}`);
  return response.data;
};

/**
 * Fetch all Pokemon types
 */
export const fetchAllTypes = async (): Promise<TypeResponse> => {
  const response = await apiClient.get<TypeResponse>('/type');
  return response.data;
};
