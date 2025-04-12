import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PokemonItem} from '../utils/entities/pokemonItem';
import {HeartIcon} from '../../assets/svg';
import {useFavorites} from '../context/favoritesContext';
import Toast from 'react-native-toast-message';
import {onlyFirstLetterUpperCase} from '../utils/textHelper';

interface PokemonCardProps {
  pokemon: PokemonItem;
  onPress: () => void;
}
const PokemonCard = ({pokemon, onPress}: PokemonCardProps) => {
  const {favorites, addFavorite, removeFavorite} = useFavorites();

  // Check if the current pokemon is a favorite
  const isFavorite = favorites.some(fav => fav.name === pokemon.name);

  const toggleFavorite = () => {
    if (isFavorite) {
      Toast.show({
        type: 'success',
        text1: 'Removed',
        text2: `You have removed ${onlyFirstLetterUpperCase(
          pokemon.name,
        )} from your favorites.`,
      });
      removeFavorite(pokemon); // Remove from favorites
    } else {
      Toast.show({
        type: 'success',
        text1: 'Added',
        text2: `You have added ${onlyFirstLetterUpperCase(
          pokemon.name,
        )} to your favorites.`,
      });
      addFavorite(pokemon); // Add to favorites
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.name}>{onlyFirstLetterUpperCase(pokemon.name)}</Text>
      <View style={styles.favoriteContainer}>
        <TouchableOpacity onPress={toggleFavorite}>
          <HeartIcon filled={isFavorite} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {fontSize: 18},
  favoriteContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
