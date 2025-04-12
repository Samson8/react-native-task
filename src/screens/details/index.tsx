import {useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getPokemonDetails} from '../../api';
import {RootNavigationParamList, Routes} from '../../utils/constants';
import {PokemonItemDetails} from '../../utils/entities/pokemonItemDetails';

type Props = NativeStackScreenProps<RootNavigationParamList, Routes.Details>;
const DetailsScreen = ({route}: Props) => {
  const {url} = route.params;
  const [pokemon, setPokemon] = useState<PokemonItemDetails | undefined>(
    undefined,
  );

  useEffect(() => {
    getPokemonDetails(url).then(setPokemon).catch(console.error);
  }, [url]);

  if (!pokemon) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
      <Image
        source={{uri: pokemon.sprites.front_default}}
        style={styles.image}
      />
      <Text>Height: {pokemon.height}</Text>
      <Text>Weight: {pokemon.weight}</Text>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 18,
  },
  loader: {flex: 1},
});
