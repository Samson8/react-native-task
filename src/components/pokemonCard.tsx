import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PokemonItem} from '../utils/entities/pokemonItem';
import {useState} from 'react';
import {HeartIcon} from '../../assets/svg';

interface PokemonCardProps {
  pokemon: PokemonItem;
  onPress: () => void;
}
const PokemonCard = ({pokemon, onPress}: PokemonCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.name}>
        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
      </Text>
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
