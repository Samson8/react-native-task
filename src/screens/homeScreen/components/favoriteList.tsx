import React, {useEffect, useState} from 'react';
import {useFavorites} from '../../../context/favoritesContext';
import FlashListComponent from '../../../components/flashlistComponent';
import SearchBar from '../../../components/searchBar';
import {PokemonItem} from '../../../utils/entities/pokemonItem';

const FavoritesList = () => {
  const {favorites} = useFavorites();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPokemonList, setFilteredPokemonList] =
    useState<PokemonItem[]>(favorites);

  // Filter the pokemon list based on the search query
  useEffect(() => {
    if (searchQuery) {
      const filteredList = favorites.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredPokemonList(filteredList);
    } else {
      setFilteredPokemonList(favorites);
    }
  }, [searchQuery, favorites]);

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search favorite Pokémon"
      />
      <FlashListComponent
        handleLoadMore={() => {}}
        loading={false}
        pokemonList={filteredPokemonList}
      />
    </>
  );
};

export default FavoritesList;
