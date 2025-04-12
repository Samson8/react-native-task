import {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {getPokemonList} from '../../../api';
import {PokemonItem} from '../../../utils/entities/pokemonItem';
import FlashListComponent from '../../../components/flashlistComponent';
import Toast from 'react-native-toast-message';

const URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';
const AllPokemon = () => {
  const [pokemonList, setPokemonList] = useState<PokemonItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextUrl, setNextUrl] = useState<string | undefined>(undefined);

  const fetchPokemonList = async (url: string) => {
    try {
      const data = await getPokemonList(url);
      setPokemonList(prev => [...prev, ...data.results]);
      setNextUrl(data.next);
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error fetching Pokemon details',
        text2: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchPokemonList(nextUrl!);
  };

  useEffect(() => {
    fetchPokemonList(URL);
  }, []);

  // Render the activity indicator when loading
  if (loading) {
    return <ActivityIndicator size="large" style={styles.activityIndicator} />;
  }

  // Render the list of Pokemon
  // using FlashList for better performance with large lists
  return (
    <FlashListComponent
      handleLoadMore={handleLoadMore}
      loading={loading}
      pokemonList={pokemonList}
    />
  );
};

export default AllPokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  activityIndicator: {
    flex: 1,
  },
  loadingFooter: {padding: 16},
  listContentContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
});
