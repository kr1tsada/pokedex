import { type FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePokemonDetail } from '@/hooks';
import { Container } from '@/components/layout';
import { Loading, Button } from '@/components/common';
import { PokemonDetailHeader } from '@/components/pokemon/PokemonDetailHeader';
import { PokemonInfo } from '@/components/pokemon/PokemonInfo';
import { PokemonStats } from '@/components/pokemon/PokemonStats';
import { PokemonAbilities } from '@/components/pokemon/PokemonAbilities';
import { EvolutionChain } from '@/components/pokemon/EvolutionChain';
import { ArrowLeftOutlined } from '@ant-design/icons';

/**
 * PokemonDetailPage Component
 * หน้าแสดงรายละเอียดของ Pokemon แต่ละตัว
 * Route: /pokemon/:idOrName
 */
export const PokemonDetailPage: FC = () => {
  const { idOrName } = useParams<{ idOrName: string }>();
  const navigate = useNavigate();
  const { data: pokemon, isLoading, error } = usePokemonDetail(idOrName || '');

  // Loading state
  if (isLoading) {
    return (
      <Container className="py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loading size="large" />
          <p className="text-gray-600">Loading Pokemon data...</p>
        </div>
      </Container>
    );
  }

  // Error state
  if (error || !pokemon) {
    return (
      <Container className="py-16">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="text-6xl">😢</div>
          <h1 className="text-2xl font-bold text-gray-800">Pokemon Not Found</h1>
          <p className="text-gray-600">
            The Pokemon you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Button
            onClick={() => navigate('/')}
            variant="default"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
          >
            Back to Home
          </Button>
        </div>
      </Container>
    );
  }

  // Success state
  return (
    <Container className="py-8 animate-fade-in">
      {/* Back button */}
      <div className="mb-6">
        <Button
          onClick={() => navigate('/')}
          variant="default"
          className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
          icon={<ArrowLeftOutlined />}
        >
          <span className="hidden sm:inline">Back to Home</span>
        </Button>
      </div>

      {/* Hero Section */}
      <PokemonDetailHeader pokemon={pokemon} />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Information Section */}
          <div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            style={{ animation: 'slideUp 0.4s ease-out 0.1s both' }}
          >
            <PokemonInfo
              height={pokemon.height}
              weight={pokemon.weight}
              baseExperience={pokemon.base_experience}
              types={pokemon.types}
            />
          </div>

          {/* Stats Section */}
          <div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            style={{ animation: 'slideUp 0.4s ease-out 0.2s both' }}
          >
            <PokemonStats stats={pokemon.stats} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Abilities Section */}
          <div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            style={{ animation: 'slideUp 0.4s ease-out 0.3s both' }}
          >
            <PokemonAbilities abilities={pokemon.abilities} />
          </div>

          {/* Evolution Chain Section */}
          <div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            style={{ animation: 'slideUp 0.4s ease-out 0.4s both' }}
          >
            <EvolutionChain speciesUrl={pokemon.species.url} />
          </div>
        </div>
      </div>
    </Container>
  );
};
