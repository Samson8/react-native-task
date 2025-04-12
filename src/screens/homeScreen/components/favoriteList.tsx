import React from 'react';
import {useFavorites} from '../../../context/favoritesContext';
import FlashListComponent from '../../../components/flashlistComponent';

const FavoritesList = () => {
  const {favorites} = useFavorites();

  return (
    <FlashListComponent
      handleLoadMore={() => {}}
      loading={false}
      pokemonList={favorites}
    />
  );
};

export default FavoritesList;
