import {useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {RootNavigationParamList, Routes} from '../../utils/constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import AllPokemon from './components/allPokemon';
import FavoritesList from './components/favoriteList';

type Props = NativeStackScreenProps<RootNavigationParamList, Routes.Home>;
const renderScene = SceneMap({
  first: AllPokemon,
  second: FavoritesList,
});

const routes = [
  {key: 'first', title: 'All Pokemon'},
  {key: 'second', title: 'Favorites'},
];

const HomeScreen = ({}: Props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={styles.container}
      renderTabBar={props => (
        <TabBar
          {...props}
          style={styles.tabBg}
          indicatorStyle={styles.indicator}
        />
      )}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {backgroundColor: '#ffffff', flex: 1},
  tabBg: {backgroundColor: '#252525'},
  indicator: {
    backgroundColor: '#ffffff',
    height: 3,
  },
});
