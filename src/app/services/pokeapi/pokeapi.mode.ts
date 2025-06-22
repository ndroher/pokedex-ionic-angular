export interface IPokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResults[];
}

export interface PokemonListResults {
  name: string;
  url: string;
  id?: number;
}

export interface IPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface IPokemonTypeResponse {
  pokemon: IPokemonSlot[];
}

export interface IPokemonSlot {
  pokemon: {
    name: string;
    url: string;
  };
}

export const PokemonTypes = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
];
