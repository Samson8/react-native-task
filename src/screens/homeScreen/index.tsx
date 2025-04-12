import {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import PokemonCard from '../../components/pokemonCard';
import {getPokemonList} from '../../api';
import {RootNavigationParamList, Routes} from '../../utils/constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PokemonItem} from '../../utils/entities/pokemonItem';
import {FlashList} from '@shopify/flash-list';

type Props = NativeStackScreenProps<RootNavigationParamList, Routes.Home>;

const URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';
const HomeScreen = ({navigation}: Props) => {
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
      console.log(error);
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

  // Render loading footer when more items are loading
  const renderFooter = () => {
    return loading ? (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    ) : null;
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.activityIndicator} />;
  }

  return (
    <FlashList
      data={pokemonList}
      keyExtractor={item => item.name}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.listContentContainer}
      estimatedItemSize={54.7}
      renderItem={({item}) => (
        <PokemonCard
          pokemon={item}
          onPress={() => navigation.navigate(Routes.Details, {url: item.url})}
        />
      )}
    />
  );
};

export default HomeScreen;

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
