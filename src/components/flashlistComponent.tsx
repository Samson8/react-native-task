import {FlashList} from '@shopify/flash-list';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import PokemonCard from './pokemonCard';
import {PokemonItem} from '../utils/entities/pokemonItem';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationParamList, Routes} from '../utils/constants';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Props {
  pokemonList: PokemonItem[];
  handleLoadMore: () => void;
  loading: boolean;
}

type Navigation = NativeStackNavigationProp<
  RootNavigationParamList,
  Routes.Home
>;
const FlashListComponent = ({handleLoadMore, pokemonList, loading}: Props) => {
  const navigation = useNavigation<Navigation>();

  // Render loading footer when more items are loading
  const renderFooter = () => {
    return loading ? (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    ) : null;
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyList}>
        <Text style={styles.emptyText}>Nothing to see here 👋😔!</Text>
      </View>
    );
  };

  return (
    <FlashList
      data={pokemonList}
      keyExtractor={item => item.name}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.listContentContainer}
      estimatedItemSize={54.7}
      ListEmptyComponent={renderEmptyComponent}
      renderItem={({item}) => (
        <PokemonCard
          pokemon={item}
          onPress={() => navigation.navigate(Routes.Details, {url: item.url})}
        />
      )}
    />
  );
};

export default FlashListComponent;

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
  emptyList: {
    flex: 1,
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 18,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
