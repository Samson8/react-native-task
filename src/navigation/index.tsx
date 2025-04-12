import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {getToastConfig} from '../utils/toastConfig';
import {Routes} from '../utils/constants';
import HomeScreen from '../screens/homeScreen';
import DetailsScreen from '../screens/details';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const toastConfig = getToastConfig();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.Home}>
        <Stack.Screen name={Routes.Home} component={HomeScreen} />
        <Stack.Screen name={Routes.Details} component={DetailsScreen} />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};
export default Navigation;
