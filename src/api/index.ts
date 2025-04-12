export const getPokemonList = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon');
  }
  return response.json();
};

export const getPokemonDetails = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch details');
  }
  return response.json();
};
