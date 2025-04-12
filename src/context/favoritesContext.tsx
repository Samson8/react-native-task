import React, {createContext, useContext, useState} from 'react';
import {PokemonItem} from '../utils/entities/pokemonItem';

//Context to store the favorite Pokémon
interface FavoritesContextType {
  favorites: PokemonItem[];
  addFavorite: (pokemon: PokemonItem) => void;
  removeFavorite: (pokemon: PokemonItem) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

//A custom hook to access the context easily
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

//A provider component to wrap the app with the context
export const FavoritesProvider = ({children}: {children: React.ReactNode}) => {
  const [favorites, setFavorites] = useState<PokemonItem[]>([]);

  const addFavorite = (pokemon: PokemonItem) => {
    setFavorites(prevFavorites => [...prevFavorites, pokemon]);
  };

  const removeFavorite = (pokemon: PokemonItem) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(item => item.name !== pokemon.name),
    );
  };

  return (
    <FavoritesContext.Provider value={{favorites, addFavorite, removeFavorite}}>
      {children}
    </FavoritesContext.Provider>
  );
};
