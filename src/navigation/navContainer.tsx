import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import {getToastConfig} from '../utils/toastConfig';
import {Routes} from '../utils/constants';
import {HomeScreen} from '../screens/homeScreen';

const Stack = createStackNavigator();

const NavContainer = () => {
  const toastConfig = getToastConfig();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.Home}>
        <Stack.Screen name={Routes.Home} component={HomeScreen} />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};
export default NavContainer;
