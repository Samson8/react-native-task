import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {RootNavigationParamList, Routes} from '../utils/constants';
import HomeScreen from '../screens/homeScreen';
import DetailsScreen from '../screens/details';

const Stack = createNativeStackNavigator<RootNavigationParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.Home}>
        <Stack.Screen name={Routes.Home} component={HomeScreen} />
        <Stack.Screen name={Routes.Details} component={DetailsScreen} />
      </Stack.Navigator>
      <Toast position="bottom" />
    </NavigationContainer>
  );
};
export default Navigation;
