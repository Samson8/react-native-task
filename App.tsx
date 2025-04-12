import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NavContainer from './src/navigation/navContainer';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavContainer />
    </SafeAreaProvider>
  );
};

export default App;
