import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import {FavoritesProvider} from './src/context/favoritesContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <Navigation />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
};

export default App;
