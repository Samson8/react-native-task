import {View, TextInput, StyleSheet} from 'react-native';
import {SearchIcon} from '../../assets/svg';

interface Props {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  placeholder = 'Search Pokémon',
}: Props) => {
  return (
    <View style={styles.searchContainer}>
      <SearchIcon />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingLeft: 8,
  },
  searchIcon: {
    marginRight: 4,
  },
});
