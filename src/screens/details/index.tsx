import {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getPokemonDetails} from '../../api';
import {RootNavigationParamList, Routes} from '../../utils/constants';
import {PokemonItemDetails} from '../../utils/entities/pokemonItemDetails';
import Toast from 'react-native-toast-message';
import {onlyFirstLetterUpperCase} from '../../utils/textHelper';
import {useFavorites} from '../../context/favoritesContext';
import {HeartIcon} from '../../../assets/svg';

type Props = NativeStackScreenProps<RootNavigationParamList, Routes.Details>;

const DetailsScreen = ({route}: Props) => {
  const {url} = route.params;
  const [toggleImage, setToggleImage] = useState<'FRONT' | 'BACK' | 'SHINNY'>(
    'FRONT',
  );
  const [pokemon, setPokemon] = useState<PokemonItemDetails | undefined>(
    undefined,
  );

  const {favorites, addFavorite, removeFavorite} = useFavorites();

  // Check if the current pokemon is a favorite
  const isFavorite = favorites.some(fav => fav.name === pokemon?.name);

  const toggleFavorite = () => {
    const pokemonObj = {
      name: pokemon!.name,
      url: url,
    };
    if (isFavorite) {
      Toast.show({
        type: 'success',
        text1: 'Removed',
        text2: `You have removed ${onlyFirstLetterUpperCase(
          pokemon!.name,
        )} from your favorites.`,
      });
      removeFavorite(pokemonObj); // Remove from favorites
    } else {
      Toast.show({
        type: 'success',
        text1: 'Added',
        text2: `You have added ${onlyFirstLetterUpperCase(
          pokemon!.name,
        )} to your favorites.`,
      });
      addFavorite(pokemonObj); // Add to favorites
    }
  };

  const fetchPokemonDetails = async () => {
    try {
      const response = await getPokemonDetails(url);
      setPokemon(response);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error fetching Pokemon details',
        text2: 'Please try again later.',
      });
    }
  };

  useEffect(() => {
    fetchPokemonDetails();
  });

  if (pokemon === undefined) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {onlyFirstLetterUpperCase(pokemon.name)}
          </Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <HeartIcon filled={isFavorite} />
          </TouchableOpacity>
        </View>
        <Image
          source={{
            uri:
              toggleImage === 'FRONT'
                ? pokemon.sprites.other?.['official-artwork']?.front_default
                : toggleImage === 'BACK'
                ? pokemon.sprites.other?.['official-artwork']?.back_default
                : pokemon.sprites.other?.['official-artwork']?.front_shiny,
          }}
          style={styles.image}
        />
        <View style={styles.row}>
          <Text style={styles.decsText}>Height: {pokemon.height}</Text>
          <Text style={styles.decsText}>Weight: {pokemon.weight}</Text>

          <Text style={styles.decsText}>
            Base Experience: {pokemon.base_experience}
          </Text>
        </View>
        <Text style={[styles.titleText, styles.section]}>Sprites</Text>
        <View style={styles.row}>
          {pokemon.sprites.other?.['official-artwork']?.front_default && (
            <TouchableOpacity onPress={() => setToggleImage('FRONT')}>
              <Image
                source={{uri: pokemon.sprites.front_default}}
                style={styles.sprite}
              />
            </TouchableOpacity>
          )}
          {pokemon.sprites.other?.['official-artwork']?.back_default && (
            <TouchableOpacity onPress={() => setToggleImage('BACK')}>
              <Image
                source={{uri: pokemon.sprites.back_default}}
                style={styles.sprite}
              />
            </TouchableOpacity>
          )}
          {pokemon.sprites.other?.['official-artwork']?.front_shiny && (
            <TouchableOpacity onPress={() => setToggleImage('SHINNY')}>
              <Image
                source={{uri: pokemon.sprites.front_shiny}}
                style={styles.sprite}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.titleText}>Types</Text>
        {pokemon.types.map(type => (
          <Text key={type.type.name} style={styles.decsText}>
            {onlyFirstLetterUpperCase(type.type.name)}
          </Text>
        ))}

        <Text style={[styles.titleText, styles.section]}>Stats</Text>
        {pokemon.stats.map(stat => (
          <Text key={stat.stat.name} style={styles.decsText}>
            {onlyFirstLetterUpperCase(stat.stat.name)}: {stat.base_stat}
          </Text>
        ))}

        <Text style={[styles.titleText, styles.section]}>Moves</Text>
        {pokemon.moves.slice(0, 5).map(move => (
          <Text key={move.move.name} style={styles.decsText}>
            {onlyFirstLetterUpperCase(move.move.name)}
          </Text>
        ))}

        <Text style={[styles.titleText, styles.section]}>Abilities</Text>
        {pokemon.abilities.map(ability => (
          <Text key={ability.ability.name} style={styles.decsText}>
            {onlyFirstLetterUpperCase(ability.ability.name)}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loader: {flex: 1},
  decsText: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sprite: {
    width: 80,
    height: 80,
    marginRight: 8,
  },
  row: {flexDirection: 'row', gap: 12, justifyContent: 'center'},
  section: {
    marginTop: 20,
    width: '100%',
  },
});
